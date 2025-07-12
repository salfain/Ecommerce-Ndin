"use server";

import { redirect } from "next/navigation";
import { ActionResult } from "@/types";
import { schemaCategory } from "@/lib/schema";
import prisma from "@/lib/prisma";


export async function postCategory(
  _: unknown,
  formdata: FormData
): Promise<ActionResult> {
  const validate = schemaCategory.safeParse({
    name: formdata.get("name"),
  });

  if (!validate.success) {
    return {
      error: validate.error.errors[0].message,
    };
  }

  try {
    await prisma.location.create({
      data: {
        name: validate.data.name,
      },
    });
  } catch (error) {
    console.log(error);
    return {error: 'failed to insert data'};
  }
  return redirect("/dashboard/locations");
}


export async function updateCategory(
  _: unknown,
  formdata: FormData,
  id: number | undefined
): Promise<ActionResult> {

  const validate = schemaCategory.safeParse({
    name: formdata.get("name"),
  });

  if (!validate.success) {
    return {
      error: validate.error.errors[0].message,
    };
  }

  if (!id === undefined) {
    return {
      error: "ID is not found",
    }
  }

  try {
    await prisma.location.update({
      where: { id: id },
      data: {
        name: validate.data.name
      }
  })
    } catch (error) {
      console.log(error);
      return {error: 'failed to update data'}
    }
    return redirect("/dashboard/locations");
  }

  export async function deleteCategory(
    _:unknown,
    formdata: FormData,
    id: number
  ): Promise<ActionResult> {

    try {
      await prisma.location.delete({
        where: { id}})
    } catch (error) {
      console.log(error);
      return{
        error: "failed to delete data"
      }
    }
    return redirect("/dashboard/locations");
  }