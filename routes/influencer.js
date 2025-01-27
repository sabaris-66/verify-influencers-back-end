const express = require("express");
const {
  getAllInfluencers,
  getInfluencerById,
  createInfluencer,
  updateInfluencer,
  deleteInfluencer,
} = require("../controllers/influencer");

const router = express.Router();

router.get("/", getAllInfluencers);
router.get("/:id", getInfluencerById);
router.post("/", createInfluencer);
router.put("/:id", updateInfluencer);
router.delete("/:id", deleteInfluencer);

module.exports = router;
