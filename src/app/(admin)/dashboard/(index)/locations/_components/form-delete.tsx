"use client";

import { Button } from "@/components/ui/button";
import { ActionResult } from "@/types";
import { error } from "console";
import { Trash } from "lucide-react";
import React from "react";
import { deleteCategory } from "../lib/actions";
import { useFormState, useFormStatus } from "react-dom";

const initialState: ActionResult = {
  error: "",
};

interface FormDeleteProps {
  id: number;
}

function SubmitButton(){
    const {pending} = useFormStatus()
    return ( <Button type="submit" variant="destructive" size="sm" disabled={pending}>
        <Trash className="w-4 h-4mr-2" /> {pending ? "Loading..." : "Delete"}
      </Button>)
}

export default function FormDelete({ id }: FormDeleteProps) {
  const deleteCategoryWithId = (_: unknown, formData: FormData) =>
    deleteCategory(_, formData, id);

  const [state, formAction] = useFormState(deleteCategoryWithId, initialState);

  return (
    <form action={formAction}>
     <SubmitButton />
    </form>
  );
}
