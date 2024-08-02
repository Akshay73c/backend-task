import express from "express";
import { PrismaClient } from "@prisma/client";
import { categoryData, categoryDataType } from "../zodTypes/zodIndex";

const prisma = new PrismaClient();

export const categoryRouter = express.Router();

categoryRouter.post("/", async (req, res) => {
  const parsedBody = categoryData.safeParse(req.body);
  if (!parsedBody.success) {
    return res.json({ message: "Wrong input types" });
  }
  const { name, description, status }: categoryDataType = parsedBody.data;

  try {
    const category = await prisma.category.create({
      data: {
        name,
        description,
        status,
      },
    });

    res.json({ message: category });
  } catch (error) {
    res.json(error);
  }
});

categoryRouter.put("/:categoryId", async (req, res) => {
  const id = Number(req.params.categoryId);

  const parsedBody = categoryData.safeParse(req.body);
  if (!parsedBody.success) {
    return res.json({ message: "Wrong input types" });
  }
  const { name, description, status }: categoryDataType = parsedBody.data;

  try {
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: { name, description, status },
    });

    res.json({ message: updatedCategory });
  } catch (error) {
    res.json(error);
  }
});

categoryRouter.get("/", async (req, res) => {
  try {
    const catgories = await prisma.category.findMany({
      where: {
        status: true,
      },
      select: {
        name: true,
        description: true,
        Product: {
          select: {
            name: true,
            price: true,
          },
        },
      },
    });

    res.json({ catgories });
  } catch (error) {
    res.json(error);
  }
});

categoryRouter.get("/:categoryId", async (req, res) => {
  const id = Number(req.params.categoryId);
  try {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        description: true,
        status: true,
        Product: {
          select: {
            name: true,
            price: true,
          },
        },
      },
    });
    res.json(category);
  } catch (error) {
    res.json(error);
  }
});

categoryRouter.delete("/:categoryId", async (req, res) => {
  try {
    const id = Number(req.params.categoryId);
    const deletedCategory = await prisma.category.delete({
      where: {
        id,
      },
    });

    res.json({ deletedProduct: deletedCategory });
  } catch (error) {
    res.json({ error: error });
  }
});
