"use server"

import { redirect } from "next/navigation"
import { ActionResult } from "@/types/"
import { schemaSignIn } from "@/lib/schema";
import prisma from "lib/prisma";
import bcrypt from 'bcrypt';
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";

export async function SignIn(
    _:unknown,
    formData: FormData,
): Promise<ActionResult> {

    console.log(formData.get('email'));

    const validate = schemaSignIn.safeParse({
        email: formData.get('email'),
        password: formData.get('password')
    })

    if (!validate.success) {

        console.log(validate);
        return { error: validate.error.errors[0].message }
    }

    const existingUser = await prisma.user.findFirst({
        where: { email: validate.data.email, role: 'superadmin' }
    })   
    
    if (!existingUser) {return { error: "Email not found" }}

    const comparePassword = bcrypt.compareSync(validate.data.password, existingUser.password)
    if (!comparePassword) {return { error: "Email/Password Incorrect" }}

    const session = await lucia.createSession(existingUser.id, {})
    const sessionCookie = await lucia.createSessionCookie(session.id)
    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    )
    return redirect('/dashboard')
}