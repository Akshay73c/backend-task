import express from "express";
import { categoryRouter } from "./routes/category";
import { productRouter } from "./routes/product";
import { orderRouter } from "./routes/order";
import { userRouter } from "./routes/user";
import { addressRouter } from "./routes/address";

export const mainRouter = express.Router();

mainRouter.use("/category", categoryRouter);
mainRouter.use("/product", productRouter);
mainRouter.use("/order", orderRouter);
mainRouter.use("/user", userRouter);
mainRouter.use("/address", addressRouter);
