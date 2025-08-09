import Note from "../models/Note.js";

const getAllNotes = async () => {
  const notes = await Note.findAll();
  return notes;
};

const createNote = async ({ content, important = false, date: date }) => {
  console.log("Creating note with date:", date, "Type:", typeof date);
  const note = await Note.create({
    content,
    important,
    date: date
  });
  console.log("Created note:", note.toJSON());
  return note;
};

export { getAllNotes, createNote };
