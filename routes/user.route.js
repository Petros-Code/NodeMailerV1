import Router from "express";

export function userRoutes(userController) {
    const router = Router();

    // Création d'utilisateur
    router.post("/", (req, res) => userController.createUser(req, res));

    // Vérification email
    router.get("/verify/:token", (req, res) => userController.verifyUser(req, res));

    return router;
}
