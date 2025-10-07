import express from "express";
import * as todoService from "../service/todoService";

const router = express.Router();

router.get("/", async (req, res) => {
  const { userId } = req.query as { userId?: string };
  if (!userId) return res.status(400).json({ error: "userId required" });
  const todos = await todoService.getTodosForUser(userId);
  res.json(todos);
});

router.post("/", async (req, res) => {
  const { todo, userId } = req.body as { todo?: string; userId?: string };
  if (!todo || !userId) return res.status(400).json({ error: "Missing fields" });
  const created = await todoService.createTodoAtTop(todo, userId);
  res.status(201).json(created);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { todo, done } = req.body as { todo?: string; done?: boolean };
  const updated = await todoService.editTodo(id, { todo, done });
  if (!updated) return res.status(404).json({ error: "Not found" });
  res.json(updated);
});

router.put("/:id/order", async (req, res) => {
  const { id } = req.params;
  const { order, userId } = req.body as { order?: number; userId?: string };
  if (order == null || !userId) return res.status(400).json({ error: "order and userId required" });
  const updated = await todoService.updateTodoOrder(id, userId, order);
  if (!updated) return res.status(404).json({ error: "Not found" });
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deleted = await todoService.removeTodo(id);
  if (!deleted) return res.status(404).json({ error: "Not found" });
  res.json({ message: "Todo deleted" });
});

export default router;
