import express from "express";
import { PrismaClient } from "@prisma/client";
import { productData } from "../zodTypes/zodIndex";

const prisma = new PrismaClient();

export const productRouter = express.Router();

productRouter.post("/", async (req, res) => {
  const parsedBody = productData.safeParse(req.body);
  if (!parsedBody.success) {
    return res.json({ message: "Wrong input types" });
  }
  const { name, price, description, image, specification, categoryId } =
    parsedBody.data;

  const product = await prisma.product.create({
    data: {
      name,
      price,
      description,
      image,
      specification,
      categoryId,
    },
  });

  res.json({ message: product });
});

productRouter.put("/:productId", async (req, res) => {
  const id = Number(req.params.productId);

  const parsedBody = productData.safeParse(req.body);
  if (!parsedBody.success) {
    return res.json({ message: "Wrong input types" });
  }
  const { name, price, description, image, specification } = parsedBody.data;

  const updatedProduct = await prisma.product.update({
    where: { id },
    data: {
      name,
      price,
      description,
      image,
      specification,
    },
  });

  res.json({ message: updatedProduct });
});

productRouter.get("/", async (req, res) => {
  const products = await prisma.product.findMany();
  res.json({ products });
});

productRouter.get("/:productId", async (req, res) => {
  const id = Number(req.params.productId);
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
    select: {
      name: true,
      price: true,
      description: true,
      image: true,
      specification: true,
      createdAt: true,
      updatedAt: true,
      category: {
        select: {
          name: true,
          description: true,
        },
      },
    },
  });
  res.json(product);
});

productRouter.delete("/:productId", async (req, res) => {
  try {
    const id = Number(req.params.productId);
    const deletedProduct = await prisma.product.delete({
      where: {
        id,
      },
    });

    res.json({ deletedProduct });
  } catch (error) {
    res.json({ error: error });
  }
});
