import express from "express";
import { PrismaClient } from "@prisma/client";
import { userData } from "../zodTypes/zodIndex";

const prisma = new PrismaClient();

export const addressRouter = express.Router();

addressRouter.post("/", async (req, res) => {
  try {
    const { city, state, country, userId } = req.body;

    const address = await prisma.address.create({
      data: {
        city,
        state,
        country,
        userId,
      },
    });

    res.json({ address });
  } catch (error) {
    res.json(error);
  }
});

addressRouter.put("/:addressId", async (req, res) => {
  const id = Number(req.params.addressId);
  const { city, state, country, userId } = req.body;

  try {
    const address = await prisma.address.update({
      where: { id },
      data: { city, state, country, userId },
    });

    res.json({ address });
  } catch (error) {
    res.json(error);
  }
});

addressRouter.get("/", async (req, res) => {
  try {
    const address = await prisma.address.findMany();
    res.json({ address });
  } catch (error) {
    res.json(error);
  }
});
