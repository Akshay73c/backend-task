import express from "express";
import cors from "cors";
import { mainRouter } from "./router";

const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1", mainRouter);

app.listen(PORT, () => {
  console.log("Server started");
});
