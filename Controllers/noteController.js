class NoteController {
  // Retrieve all notes
  static getAllNotes(req, res) {
    res.json(notes);
  }

  // Retrieve a specific note by its ID
  static getNoteById(req, res) {
    const noteId = req.params.id;
    const note = notes.find((note) => note.id === noteId);

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json(note);
  }

  // Create a new note
  static createNote(req, res) {
    const { title, body, createdDate } = req.body;

    const newNote = {
      id: generateUniqueId(), // Implement a function to generate a unique ID
      title,
      body,
      createdDate: createdDate || new Date(),
    };

    notes.push(newNote);

    res.status(201).json(newNote);
  }

  // Update an existing note by its ID
  static updateNote(req, res) {
    const noteId = req.params.id;
    const { title, body } = req.body;

    const note = notes.find((note) => note.id === noteId);

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    note.title = title || note.title;
    note.body = body || note.body;

    res.json(note);
  }

  // Delete a specific note by its ID
  static deleteNote(req, res) {
    const noteId = req.params.id;

    const noteIndex = notes.findIndex((note) => note.id === noteId);

    if (noteIndex === -1) {
      return res.status(404).json({ error: 'Note not found' });
    }

    const deletedNote = notes.splice(noteIndex, 1)[0];

    res.json(deletedNote);
  }
}

module.exports = NoteController;


