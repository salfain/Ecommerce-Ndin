import React from "react";
import { getCategoryById } from "../../../categories/lib/data";
import { redirect } from "next/navigation";
import FormCategory from "../../_components/form-category";
import { Tedit } from "@/types";

type Tparams = {
  id: string;
};


export default async function EditPage({ params }: Tedit) {
  const data = await getCategoryById(params.id);

  if (!data) {
    return redirect("/dashboard/locations");
  }
  console.log(data);
  return <FormCategory type="EDIT" data={data} />
}
