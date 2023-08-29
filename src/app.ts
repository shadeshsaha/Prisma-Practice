import cors from "cors";
import express, { Application } from "express";
import { CategoryRoutes } from "./modules/category/category.route";
import { UserRoutes } from "./modules/user/user.route";

const app: Application = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/category", CategoryRoutes);

export default app;
