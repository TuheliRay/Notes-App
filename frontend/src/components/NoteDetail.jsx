const NoteDetail = ({ note, formatDate , onEdit }) => {
  return (
    <div className="note-details">
      <h2>
        <strong>Title:</strong> {note.title}
      </h2>
      <p>{formatDate(note.createdAt)}</p>
      <p>{note.content}</p>
      <div className="bottom-action">
        <button className="edit-btn" onClick={onEdit}>Edit</button>
      </div>
    </div>
  );
};

export default NoteDetail;
