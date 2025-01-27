const prisma = require("../prisma/client");

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

// Get a single task by ID
const getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await prisma.task.findUnique({
      where: { id: parseInt(id) },
    });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch task" });
  }
};

// Create a new task
const createTask = async (req, res) => {
  const {
    filters,
    status,
    priority,
    dueDate,
    reviewerId,
    claimsToAnalyze,
    notes,
  } = req.body;
  try {
    const task = await prisma.task.create({
      data: {
        filters,
        status,
        priority,
        dueDate,
        reviewerId: reviewerId ? parseInt(reviewerId) : null,
        claimsToAnalyze,
        notes,
      },
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: "Failed to create task" });
  }
};

// Update a task
const updateTask = async (req, res) => {
  const { id } = req.params;
  const {
    filters,
    status,
    priority,
    dueDate,
    reviewerId,
    claimsToAnalyze,
    notes,
  } = req.body;
  try {
    const task = await prisma.task.update({
      where: { id: parseInt(id) },
      data: {
        filters,
        status,
        priority,
        dueDate,
        reviewerId: reviewerId ? parseInt(reviewerId) : null,
        claimsToAnalyze,
        notes,
      },
    });
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: "Failed to update task" });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.task.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete task" });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
