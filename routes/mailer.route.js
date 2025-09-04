import express from "express";
import multer from "multer";
import MailerRepository from "../modules/mailer.module.repository.js";
import MailerController from "../modules/mailer.module.controller.js";
import upload from "../middlewares/multer.filter.js";

const router = express.Router();

const mailerRepository = new MailerRepository();
const mailerController = new MailerController(mailerRepository);

router.post("/send", upload.single("attachment"), (req, res) => 
    mailerController.sendMail(req, res)
);

export default router;