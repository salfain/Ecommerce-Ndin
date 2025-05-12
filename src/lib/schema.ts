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
