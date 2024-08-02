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

  const category = await prisma.category.create({
    data: {
      name,
      description,
      status,
    },
  });

  res.json({ message: category });
});

categoryRouter.put("/:categoryId", async (req, res) => {
  const id = Number(req.params.categoryId);

  const parsedBody = categoryData.safeParse(req.body);
  if (!parsedBody.success) {
    return res.json({ message: "Wrong input types" });
  }
  const { name, description, status }: categoryDataType = parsedBody.data;

  const updatedCategory = await prisma.category.update({
    where: { id },
    data: { name, description, status },
  });

  res.json({ message: updatedCategory });
});

categoryRouter.get("/", async (req, res) => {
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
});

categoryRouter.get("/:categoryId", async (req, res) => {
  const id = Number(req.params.categoryId);
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
});
