import express from "express";
import { PrismaClient } from "@prisma/client";
import { userData } from "../zodTypes/zodIndex";

const prisma = new PrismaClient();

export const userRouter = express.Router();

userRouter.post("/", async (req, res) => {
  const parsedBody = userData.safeParse(req.body);
  if (!parsedBody.success) {
    return res.json({ message: "Wrong input types" });
  }
  const { email, password, firstName, lastName } = parsedBody.data;

  const user = await prisma.user.create({
    data: {
      email,
      password,
      firstName,
      Lastname: lastName,
    },
  });

  res.json({ user });
});

userRouter.put("/:userId", async (req, res) => {
  const id = Number(req.params.userId);

  const parsedBody = userData.safeParse(req.body);
  if (!parsedBody.success) {
    return res.json({ message: "Wrong input types" });
  }
  const { email, password, firstName, lastName } = parsedBody.data;

  const updatedUser = await prisma.user.update({
    where: { id },
    data: { email, password, firstName, Lastname: lastName },
  });

  res.json({ updatedUser });
});

userRouter.get("/", async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      firstName: true,
      Lastname: true,
      addresses: {
        select: {
          city: true,
          state: true,
        },
      },
      orders: {
        select: {
          product: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  res.json({ users });
});

userRouter.get("/:userId", async (req, res) => {
  const id = Number(req.params.userId);
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      email: true,
      firstName: true,
      Lastname: true,
      orders: {
        select: {
          product: { select: { name: true } },
        },
      },
      addresses: {
        select: {
          street: true,
          state: true,
          country: true,
        },
      },
    },
  });
  res.json(user);
});
