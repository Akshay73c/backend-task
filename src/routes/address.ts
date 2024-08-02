import express from "express";
import { PrismaClient } from "@prisma/client";
import { userData } from "../zodTypes/zodIndex";

const prisma = new PrismaClient();

export const addressRouter = express.Router();

addressRouter.post("/", async (req, res) => {
  //   const parsedBody = userData.safeParse(req.body);
  //   if (!parsedBody.success) {
  //     return res.json({ message: "Wrong input types" });
  //   }
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
});

addressRouter.put("/:addressId", async (req, res) => {
  const id = Number(req.params.addressId);
  const { city, state, country, userId } = req.body;

  const address = await prisma.address.update({
    where: { id },
    data: { city, state, country, userId },
  });

  res.json({ address });
});

addressRouter.get("/", async (req, res) => {
  const address = await prisma.address.findMany();
  res.json({ address });
});

// addressRouter.get("/:userId", async (req, res) => {
//   const id = Number(req.params.userId);
//   const user = await prisma.user.findUnique({
//     where: {
//       id,
//     },
//     select: {
//       email: true,
//       firstName: true,
//       Lastname: true,
//       orders: {
//         select: {
//           product: { select: { name: true } },
//         },
//       },
//       addresses: {
//         select: {
//           street: true,
//           state: true,
//           country: true,
//         },
//       },
//     },
//   });
//   res.json(user);
// });
