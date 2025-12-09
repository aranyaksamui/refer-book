// Importing dependencies
import { Router } from "express";

// Importing controllers
import { getHomePage, getProtectedRoute } from "../controllers/general_controllers.js";
import { isUserAuthenticated } from "../auth/auth.js";

const router = Router();

router.get("/", getHomePage);
router.get("/protected", isUserAuthenticated, getProtectedRoute);

export default router;
