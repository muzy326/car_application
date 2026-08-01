const express = require("express");
const router = express.Router();
const { chatWithAI, bookWithAI, adminAIQuery } = require("../controllers/aiController");
const { authenticateToken, authorizeRoles } = require("../middleware");

router.post("/chat", chatWithAI);
router.post("/book", authenticateToken, bookWithAI);
router.post("/admin", authenticateToken, authorizeRoles(['admin']), adminAIQuery);

module.exports = router;