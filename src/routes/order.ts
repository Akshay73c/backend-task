import express from "express";
import { PrismaClient } from "@prisma/client";
import { orderData } from "../zodTypes/zodIndex";
import { authMiddleware } from "../authMiddleware";

const prisma = new PrismaClient();

export const orderRouter = express.Router();

orderRouter.post("/", authMiddleware, async (req, res) => {
  const parsedBody = orderData.safeParse(req.body);
  if (!parsedBody.success) {
    return res.json({ message: "Wrong input types" });
  }
  const { productId, userId, addressId, description } = parsedBody.data;
  try {
    const order = await prisma.order.create({
      data: {
        productId,
        userId,
        addressId,
        description,
      },
    });

    res.json({ message: order });
  } catch (error) {
    res.json(error);
  }
});

orderRouter.put("/:orderId", async (req, res) => {
  const id = Number(req.params.orderId);

  const parsedBody = orderData.safeParse(req.body);
  if (!parsedBody.success) {
    return res.json({ message: "Wrong input types" });
  }
  const { productId, userId, addressId, description } = parsedBody.data;

  try {
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { productId, userId, addressId, description },
    });

    res.json({ message: updatedOrder });
  } catch (error) {
    res.json(error);
  }
});

orderRouter.get("/", async (req, res) => {
  try {
    const orders = await prisma.order.findMany();
    res.json({ orders });
  } catch (error) {
    res.json(error);
  }
});

orderRouter.get("/:orderId", async (req, res) => {
  const id = Number(req.params.orderId);
  try {
    const order = await prisma.order.findUnique({
      where: {
        id,
      },
    });
    res.json(order);
  } catch (error) {
    res.json(error);
  }
});
