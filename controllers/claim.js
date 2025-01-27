const prisma = require("../prisma/client");

// Get all claims
const getAllClaims = async (req, res) => {
  try {
    const claims = await prisma.claim.findMany();
    res.json(claims);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch claims" });
  }
};

// Get a single claim by ID
const getClaimById = async (req, res) => {
  const { id } = req.params;
  try {
    const claim = await prisma.claim.findUnique({
      where: { id: parseInt(id) },
    });
    if (!claim) {
      return res.status(404).json({ error: "Claim not found" });
    }
    res.json(claim);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch claim" });
  }
};

// Create a new claim
const createClaim = async (req, res) => {
  const { description, category, influencerId } = req.body;
  try {
    const claim = await prisma.claim.create({
      data: {
        description,
        category,
        influencerId: parseInt(influencerId),
      },
    });
    res.status(201).json(claim);
  } catch (error) {
    res.status(400).json({ error: "Failed to create claim" });
  }
};

// Update a claim
const updateClaim = async (req, res) => {
  const { id } = req.params;
  const { description, category, verification, trustScore, confidenceScore } =
    req.body;
  try {
    const claim = await prisma.claim.update({
      where: { id: parseInt(id) },
      data: {
        description,
        category,
        verification,
        trustScore,
        confidenceScore,
      },
    });
    res.json(claim);
  } catch (error) {
    res.status(400).json({ error: "Failed to update claim" });
  }
};

// Delete a claim
const deleteClaim = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.claim.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Claim deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete claim" });
  }
};

module.exports = {
  getAllClaims,
  getClaimById,
  createClaim,
  updateClaim,
  deleteClaim,
};
