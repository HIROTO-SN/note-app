import React, { useEffect } from "react";
import "./style/Sidebar.css";

const Sidebar = ({ onAddNote, onDeleteNote, notes, activeNote, setActiveNote }) => {
  
  const sortedNotes = notes.sort((a, b) => b.modDate - a.modDate);
  
  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>ノート</h1>
        <button onClick={onAddNote}>追加</button>
      </div>
      <div className="app-sidebar-notes">
        {sortedNotes.map((note) => {
          return (
            <div
              className={`app-sidebar-note ${note.id === activeNote && "active"}`}
              key={note.id}
              onClick={() => setActiveNote(note.id)}
            >
              <div className="sidebar-note-title">
                <strong>{note.title}</strong>
                <button onClick={() => onDeleteNote(note.id)}>削除</button>
              </div>
              <p>{note.content}</p>
              <small>
                最後の修正日:
                {new Date(note.modDate).toLocaleDateString("ja-JP")}
              </small>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
