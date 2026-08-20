import {Router} from "express";
import {registerUser,logoutUser, loginUser, updateProfile } from "../controllers/user.controller.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(upload.single("file"), registerUser)
router.route("/login").post(loginUser)
router.route("/profile/update").post(jwtVerify, upload.single("file"), updateProfile)
router.route("/logout").post(jwtVerify, logoutUser)

export default router;


