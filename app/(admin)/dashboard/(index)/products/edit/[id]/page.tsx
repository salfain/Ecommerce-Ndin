import React from "react";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getBrands } from "@/app/(admin)/dashboard/(index)/brands/lib/data";
import { getCategories } from "@/app/(admin)/dashboard/(index)/categories/lib/data";
import { getLocations } from "@/app/(admin)/dashboard/(index)/locations/lib/data";
import FormProduct from "@/app/(admin)/dashboard/(index)/products/_components/form-product";
import { getProductById } from "@/app/(admin)/dashboard/(index)/products/lib/data";
import { redirect } from "next/navigation";

interface EditPageProps {
  params: { id: string };
}

export default async function EditPage({ params }: EditPageProps) {
  const product = await getProductById(Number.parseInt(params.id));
  const brands = await getBrands();
  const categories = await getCategories();
  const locations = await getLocations();

  if (!product) {
    return redirect('/dashboard/product');
  }

  return (
    <FormProduct type="EDIT" data={product}>
      <div className="grid gap-3">
        <Label htmlFor="category">Category</Label>
        <Select name="category_id" defaultValue={product.category_id.toString()}>
          <SelectTrigger id="category" aria-label="Select category">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories?.map((cat) => (
              <SelectItem key={cat.id} value={`${cat.id}`}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-3">
        <Label htmlFor="brand">Brand</Label>
        <Select name="brand_id" defaultValue={product.brand_id.toString()}>
          <SelectTrigger id="brand" aria-label="Select brand">
            <SelectValue placeholder="Select brand" />
          </SelectTrigger>
          <SelectContent>
            {brands?.map((brand) => (
              <SelectItem key={brand.id} value={`${brand.id}`}>
                {brand.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-3">
        <Label htmlFor="location">Location</Label>
        <Select name="location_id" defaultValue={product.location_id.toString()}>
          <SelectTrigger id="location" aria-label="Select location">
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            {locations?.map((loc) => (
              <SelectItem key={loc.id} value={`${loc.id}`}>
                {loc.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </FormProduct>
  );
}
