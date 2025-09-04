import multer from "multer";
import path from "path";

//stockage
const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});


//filtre
const fileFilter = (req, file, cb) => {
    const allowed = [".jpg", ".png", ".pdf"];
    const ext = path.extname(file.originalname).toLowerCase();

    if (allowed.includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error("Extension not authorized, only pdf, jpeg or png"), false)
    }
}

const upload = multer({ storage, fileFilter });
export default upload