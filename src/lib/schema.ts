import { z } from "zod";

export const ALLOW_MIME_TYPES = ["image/png", "image/jpeg", "image/jpg"];

export const schemaSignIn = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const schemaCategory = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(4, { message: "Name is required min 4 characters" }),
});

export const schemaBrand = schemaCategory.extend({
  image: z
    .any()
    .refine((file: File) => ALLOW_MIME_TYPES.includes(file.type), {
      message: "File not supported",
    })
    .refine((file: File) => file?.name, {
      message: "Image is required",
    }),
});

export const schemaProduct = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(4, { message: "Name is required min 4 characters" }),
  description: z
    .string({ required_error: "Description is required" })
    .min(4, { message: "Description is required min 4 characters" }),
  price: z.string({ required_error: "Price is required" }),
  stock: z.string({ required_error: "Stock is required" }),
  brand_id: z.string({ required_error: "Brand is required" }),
  category_id: z.string({ required_error: "Category is required" }),
  location_id: z.string({ required_error: "Location is required" }),
  images: z
    .any()
    .refine((files: File[]) => files.length === 3, {
      message: "Please upload 3 image product",
    })
    .refine(
      (files: File[]) => {
        let validate = false;

        Array.from(files).find((file) => {
          if (ALLOW_MIME_TYPES.includes(file.type)) {
            validate = true;
          }
        });
        return validate;
      },
      {
        message: "Uploaded file should image",
      }
    ),
});

export const schemaProductEdit = schemaProduct.extend({
  id: z.number({required_error: "Product ID is required"})
}).omit({images:true})