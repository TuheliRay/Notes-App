import { FaPlus, FaTrash } from "react-icons/fa";
const Sidebar = ({ notes, selectedNote, onSelectNote, onDeleteNote, onNewNote }) => {
  return (
    <aside className="sidebar">
      <h1 className="app-title">Notes</h1>
      <button className="new-note-button" onClick={onNewNote}>
        + New Note
      </button>
      <div className="note-list">
        {notes.map((note) => (
          <div
            key={note._id}
            className={`note-item ${selectedNote?._id === note._id ? "active" : ""}`}
            onClick={() => onSelectNote(note)}
          >
            <div className="note-title">Title:{note.title}</div>
            <div className="note-date">{new Date(note.createdAt).toDateString()}</div>
            <button
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteNote(note._id);
              }}
            >
                <FaTrash color="grey"/>
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
