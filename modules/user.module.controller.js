import { v4 as uuidv4 } from "uuid";
import argon2 from "argon2";
import Mailer from "../utils/mailer.js";

class UserController {
    constructor(userRepository, mailer) {
        this.userRepository = userRepository;    
        this.mailer = mailer;
    }

    async createUser(req, res) {
        const { name, email, password } = req.body;

        try {
            // Validation des champs requis
            if (!email) {
                return res.status(400).json({ error: "Email is required" });
            }
            if (!name) {
                return res.status(400).json({ error: "Name is required" });
            }
            if (!password) {
                return res.status(400).json({ error: "Password is required" });
            }

            const hashedPassword = await argon2.hash(password);

            const token = uuidv4();
            const expiration = Date.now() + 15 * 60 * 1000;
            
            const newUser = await this.userRepository.createUser({
                name,
                email,
                password: hashedPassword,
                verification_token: token,
                token_expires_at: expiration
            });

            await this.mailer.sendVerificationEmail(email, name, token);

            res.status(201).json({ message: "User created. Check your email to verify." });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async verifyUser(req, res) {
        const { token } = req.params;

        try {
            const user = await this.userRepository.verifyUserByToken(token);
            res.status(200).json({ message: "Account verified with success !", user });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default UserController;
