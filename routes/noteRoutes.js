const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// Get all notes
router.get('/notes', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a specific note by ID
router.get('/notes/:noteId', async (req, res) => {
  const noteId = req.params.noteId;
  try {
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new note
router.post('/notes', async (req, res) => {
  const { title, content } = req.body;
  try {
    const note = await Note.create({ title, content });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update an existing note
router.put('/notes/:noteId', async (req, res) => {
  const noteId = req.params.noteId;
  const { title, content } = req.body;
  try {
    const note = await Note.findByIdAndUpdate(
      noteId,
      { title, content },
      { new: true }
    );
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a note
router.delete('/notes/:noteId', async (req, res) => {
  const noteId = req.params.noteId;
  try {
    const note = await Note.findByIdAndDelete(noteId);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;


