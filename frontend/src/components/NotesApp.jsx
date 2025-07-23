import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import NoteDetail from "./NoteDetail";
import NoteForm from "./NoteForm";
import Welcome from "./Welcome";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function NotesApp() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [editMode, setEditMode] = useState(false);

  const fetchNotes = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${API_BASE_URL}/api/notes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  const handleCreate = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(`${API_BASE_URL}/api/notes`, newNote , {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      } );
      setNewNote({ title: "", content: "" });
      setSelectedNote(res.data);
      fetchNotes();
    } catch (err) {
      console.error("Error creating note:", err);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${API_BASE_URL}/api/notes/${id}` , {
        headers: {
          Authorization: `Bearer ${token}`
        } , });
      if (selectedNote && selectedNote._id === id) setSelectedNote(null);
      fetchNotes();
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(`${API_BASE_URL}/api/notes/${selectedNote._id}`, {
        title: selectedNote.title,
        content: selectedNote.content,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
      fetchNotes();
      setEditMode(false);
    } catch (err) {
      console.error("Error updating note:", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

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
}
