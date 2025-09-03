import express from "express";
import dotenv from "dotenv";

//#region import ROUTES
import { userRoutes } from "./routes/user.route.js";
//#endregion

import UserRepository from "./modules/user.module.repository.js";
import UserController from "./modules/user.module.controller.js";
import Mailer from "./utils/mailer.js";

import initDB from "./config/config.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

async function startServer() {
  try {
    const db = await initDB();

    const userRepository = new UserRepository(db);
    const userController = new UserController(userRepository, Mailer);

    app.use("/users", userRoutes(userController));

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });

  } catch (error) {
    console.error("Failed to start server:", error);
  }
}

// Lancer le serveur
startServer();
