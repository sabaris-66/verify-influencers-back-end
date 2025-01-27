const prisma = require("../prisma/client");

// Get all influencers
const getAllInfluencers = async (req, res) => {
  try {
    const influencers = await prisma.influencer.findMany();
    res.json(influencers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch influencers" });
  }
};

// Get a single influencer by ID
const getInfluencerById = async (req, res) => {
  const { id } = req.params;
  try {
    const influencer = await prisma.influencer.findUnique({
      where: { id: parseInt(id) },
      include: { claims: true },
    });
    if (!influencer) {
      return res.status(404).json({ error: "Influencer not found" });
    }
    res.json(influencer);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch influencer" });
  }
};

// Create a new influencer
const createInfluencer = async (req, res) => {
  const { name, socialMediaLinks, followersCount, categories, tags } = req.body;
  try {
    const influencer = await prisma.influencer.create({
      data: {
        name,
        socialMediaLinks,
        followersCount,
        categories,
        tags,
      },
    });
    res.status(201).json(influencer);
  } catch (error) {
    res.status(400).json({ error: "Failed to create influencer" });
  }
};

// Update an influencer
const updateInfluencer = async (req, res) => {
  const { id } = req.params;
  const { name, socialMediaLinks, followersCount, categories, tags } = req.body;
  try {
    const influencer = await prisma.influencer.update({
      where: { id: parseInt(id) },
      data: {
        name,
        socialMediaLinks,
        followersCount,
        categories,
        tags,
      },
    });
    res.json(influencer);
  } catch (error) {
    res.status(400).json({ error: "Failed to update influencer" });
  }
};

// Delete an influencer
const deleteInfluencer = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.influencer.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Influencer deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete influencer" });
  }
};

module.exports = {
  getAllInfluencers,
  getInfluencerById,
  createInfluencer,
  updateInfluencer,
  deleteInfluencer,
};
