import { Router } from "express";

export function userRoutes(userController) {
    const router = Router();

    // Création d'utilisateur
    router.post("/", userController.createUser.bind(userController));

    // Vérification email
    router.get("/verify/:token", userController.verifyUser.bind(userController));

    return router;
}
