import express from "express";
import { PrismaClient } from "@prisma/client";
import { userData } from "../zodTypes/zodIndex";
import cors from "cors";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../authMiddleware";

const prisma = new PrismaClient();

const JWT_SECRET: any = process.env.JWT_SECRET;

export const userRouter = express.Router();
userRouter.use(
  cors({
    credentials: true,
  })
);

userRouter.post("/signup", async (req, res) => {
  const parsedBody = userData.safeParse(req.body);
  if (!parsedBody.success) {
    return res.json({ message: "Wrong input types" });
  }
  const { email, password, firstName, lastName } = parsedBody.data;
  try {
    const user = await prisma.user.create({
      data: {
        email,
        password,
        firstName,
        Lastname: lastName,
      },
    });

    let userId = user.id;
    const token = jwt.sign(
      {
        userId,
      },
      JWT_SECRET
    );

    res.cookie("token", token);
    res.json({ user });
  } catch (error) {
    res.json(error);
  }
});

userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user: any = await prisma.user.findUnique({
      where: {
        email,
        password,
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
    let userId = user.id;
    const token = jwt.sign(
      {
        userId,
      },
      JWT_SECRET
    );

    res.cookie("token", token);

    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

userRouter.put("/:userId", authMiddleware, async (req, res) => {
  const id = Number(req.params.userId);

  const parsedBody = userData.safeParse(req.body);
  if (!parsedBody.success) {
    return res.json({ message: "Wrong input types" });
  }
  const { email, password, firstName, lastName } = parsedBody.data;

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { email, password, firstName, Lastname: lastName },
    });

    res.json({ updatedUser });
  } catch (error) {
    res.json(error);
  }
});

userRouter.get("/", async (req, res) => {
  try {
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
  } catch (error) {
    res.json(error);
  }
});

userRouter.post("/signout", authMiddleware, (req: any, res) => {
  try {
    const id = Number(req.userId);
    res.clearCookie("token");
    res.json({ message: "Logged out" });
  } catch (error) {
    res.json(error);
  }
});
