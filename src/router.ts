import express from "express";
import cookieParser from "cookie-parser";
import { categoryRouter } from "./routes/category";
import { productRouter } from "./routes/product";
import { orderRouter } from "./routes/order";
import { userRouter } from "./routes/user";
import { addressRouter } from "./routes/address";
import { authMiddleware } from "./authMiddleware";

export const mainRouter = express.Router();

mainRouter.use(cookieParser());

mainRouter.use("/category", categoryRouter);
mainRouter.use("/product", productRouter);
mainRouter.use("/order", authMiddleware, orderRouter);
mainRouter.use("/user", userRouter);
mainRouter.use("/address", addressRouter);
