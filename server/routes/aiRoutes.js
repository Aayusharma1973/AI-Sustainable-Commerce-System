import express from "express";
import { generateCategory, generateProposal,generateImpactReport } from "../controllers/aiController.js";

const router = express.Router();

router.post("/category", generateCategory);
router.post("/proposal", generateProposal);
router.post("/impact", generateImpactReport)

export default router;