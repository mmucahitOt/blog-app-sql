import dotenv from "dotenv";
import express from "express";
import { getAllNotes, createNote } from "./services/noteService.js";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/api/notes", async (req, res) => {
  const notes = await getAllNotes();
  res.json(notes);
});

app.post("/api/notes", async (req, res) => {
  const { content, important, date } = req.body;
  const note = await createNote({ content, important, date });
  res.json(note);
});

export default app;
