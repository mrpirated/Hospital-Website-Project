import { Router } from "express";
const router = Router();
import signup from '../../middleware/signup';

router.post("/signup", signup);

export default router;
