class UserRepository {
    constructor(db) {
        this.db = db;
    }

    async createUser({ name, email, password, verif_status = "PENDIND", verification_token, token_expires_at }) {
        try {
            const result = await this.db.run(
                'INSERT INTO users (name, email, password, verif_status, verification_token, token_expires_at) VALUES (?, ?, ?, ?, ?, ?)',
                [name, email, password, verif_status, verification_token, token_expires_at]
            );

            console.log("Inserted row id:", result.lastID);

            return { id: result.lastID, name, email };
        } catch (error) {
            throw new Error("Error while creating new user: " + error.message);
        }
    }

    async verifyUserByToken(token) {
        const user = await this.db.get(
            'SELECT * FROM users WHERE verification_token = ?',
            [token]
        );

    if (!user) {
        throw new Error("Token not gud please help me, I'm under water");
    }

    if (user.token_expires_at < Date.now()) {
        throw new Error("Token is expired");
    }

    await this.db.run(
        `UPDATE users 
             SET verif_status = 'VERIFIED',
                 verification_token = NULL,
                 token_expires_at = NULL
             WHERE id = ?`,
            [user.id]
    );
        return { id: user.id, name: user.name, email: user.email };
    }
}

export default UserRepository;
