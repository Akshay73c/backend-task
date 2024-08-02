import { z } from "zod";

export const categoryData = z.object({
  name: z.string(),
  description: z.string().optional(),
  status: z.boolean().optional(),
});

export const productData = z.object({
  name: z.string(),
  price: z.number().int().positive(),
  description: z.string().optional(),
  image: z.string().optional(),
  specification: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  categoryId: z.number().int(),
});

export const orderData = z.object({
  productId: z.number().int(),
  userId: z.number().int(),
  addressId: z.number().int(),
  description: z.string().optional(),
  image: z.string().optional(),
  specification: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const userData = z.object({
  email: z.string(),
  password: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export type categoryDataType = z.infer<typeof categoryData>;
