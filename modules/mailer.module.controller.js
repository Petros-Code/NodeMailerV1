class MailerController {
    constructor(mailerRepository) {
        this.mailerRepository = mailerRepository;
    }

    async sendMail(req, res) {

        const { name, email, message } = req.body;
        const file =req.file;

        try {
            await this.mailerRepository.sendMail({ name, email, message, file });
            res.status(200).json({ success: true, message: "Form sent" });
        } catch (error) {
            console.error("Error while submiting form :", error);
            res.status(500).json({ success: false, message: "Error while submiting form" });
        }
    }
}

export default MailerController