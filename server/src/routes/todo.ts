import express from "express";
import TodoModel from "../model/TodoLists";

const router = express.Router();

// Get all todos for a user
router.get("/", async (req, res) => {
  const { userId } = req.query;
  const todos = await TodoModel.find({ user: userId });
  res.json(todos);
});

router.post("/", async (req, res) => {
  const { todo, user } = req.body;
  if (!todo || !user) return res.status(400).json({ error: "Missing fields" });
  const newTodo = await TodoModel.create({ todo, user });
  res.status(201).json(newTodo);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await TodoModel.findByIdAndDelete(id);
  res.json({ message: "Todo deleted" });
});

// Updates a todo item by editing its text or marking it as done
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { todo, done } = req.body;
  const updated = await TodoModel.findByIdAndUpdate(
    id,
    { ...(todo && { todo }), ...(done !== undefined && { done }) },
    { new: true }
  );
  res.json(updated);
});

// Update todo order
router.put("/:id/order", async (req, res) => {
  const { id } = req.params;
  const { order } = req.body;
  const updated = await TodoModel.findByIdAndUpdate(
    id,
    { order },
    { new: true }
  );
  res.json(updated);
});

export default router;
