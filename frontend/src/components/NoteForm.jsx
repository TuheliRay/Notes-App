const NoteForm = ({ newNote, setNewNote, handleCreate, isEdit = false, cancelEdit}) => {
  return (
    <div className="note-form">
  <input
    type="text"
    placeholder="Title"
    value={newNote.title}
    onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
  />
  <textarea
    placeholder="Your note..."
    rows="6"
    value={newNote.content}
    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
  ></textarea>
  <button className="submit-btn" onClick={handleCreate}>
    {isEdit ? "Update Note" : "Create Note"}
  </button>
  {isEdit && (
    <button
      className="submit-btn"
      style={{ backgroundColor: "#999", marginTop: "10px" }}
      onClick={cancelEdit}
    >
      Cancel
    </button>
  )}
</div>

  );
};

export default NoteForm;
