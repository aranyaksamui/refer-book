// Importing dependencies
import { Router } from "express";
import passport from "passport";

// Local imports
import {
    getUserRegister,
    userRegister,
    getUserLogin,
    userLogin,
    userLogout,
    getUserUpload,
    userUpload
} from "../controllers/user_controllers.js";

const router = Router();

// Routes
router.get("/", (req, res) => {
    req.isAuthenticated() ? res.redirect("/accounts/users") : res.redirect("/accounts/login");
});
router.get("/register", getUserRegister);
router.post("/register", userRegister);
router.get("/login", getUserLogin);
router.post("/login", userLogin);
router.get("/logout", userLogout);
router.get("/user/upload", getUserUpload);
router.post("/user/upload", userUpload);

export default router;
