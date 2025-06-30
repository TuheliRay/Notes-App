// src/App.js
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import NoteDetail from "./components/NoteDetail";
import NoteForm from "./components/NoteForm";
import Welcome from "./components/Welcome";
import "./index.css";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [editMode, setEditMode] = useState(false);

  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/notes");
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  const handleCreate = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/notes", newNote);
      setNewNote({ title: "", content: "" });
      setSelectedNote(res.data);
      fetchNotes();
    } catch (err) {
      console.error("Error creating note:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`);
      if (selectedNote && selectedNote._id === id) setSelectedNote(null);
      fetchNotes();
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };
  const handleUpdate = async () => {
  try {
    await axios.put(`http://localhost:5000/api/notes/${selectedNote._id}`, {
      title: selectedNote.title,
      content: selectedNote.content,
    });
    fetchNotes();
    setEditMode(false);
  } catch (err) {
    console.error("Error updating note:", err);
  }
};


  useEffect(() => {
    fetchNotes();
  }, []);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="app-container">
      <Sidebar
        notes={notes}
        selectedNote={selectedNote}
        onSelectNote={setSelectedNote}
        onDeleteNote={handleDelete}
        onNewNote={() => setSelectedNote({ _id: null, title: "", content: "" })}
      />
      <main className="main-panel">
  {selectedNote ? (
    editMode ? (
      <NoteForm
        newNote={selectedNote}
        setNewNote={setSelectedNote}
        handleCreate={handleUpdate}
        isEdit={true}
        cancelEdit={() => setEditMode(false)}
      />
    ) : selectedNote._id ? (
      <NoteDetail
        note={selectedNote}
        formatDate={formatDate}
        onEdit={() => setEditMode(true)} 
      />
    ) : (
      <NoteForm
        newNote={newNote}
        setNewNote={setNewNote}
        handleCreate={handleCreate}
      />
    )
  ) : (
    <Welcome />
  )}
   </main>
    </div>
  );
};

export default App;
