const express = require("express");
const {
  getAllClaims,
  getClaimById,
  createClaim,
  updateClaim,
  deleteClaim,
} = require("../controllers/claim");

const router = express.Router();

router.get("/", getAllClaims);
router.get("/:id", getClaimById);
router.post("/", createClaim);
router.put("/:id", updateClaim);
router.delete("/:id", deleteClaim);

module.exports = router;
