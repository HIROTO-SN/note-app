import React from "react";
import "./style/Main.css";
import Markdown from "react-markdown";

const Main = ({ activeNote, onUpdateNote }) => {
  if (!activeNote) {
    return <div className="no-active-note">ノートが選択されていません</div>;
  }

  const onEditMode = (key, value) => {
    onUpdateNote({
			...activeNote,
			[key]: value,
			modDate: Date.now(),
		});
  };
  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <input
          id="title"
          type="text"
          className="text"
          value={activeNote.title}
          onChange={(e) => onEditMode("title", e.target.value)}
        />
        <textarea
          id="content"
          placeholder="ノート内容を記入"
          value={activeNote.content}
					onChange={(e) => onEditMode("content", e.target.value)}
        ></textarea>
      </div>
      <div className="app-main-note-preview">
        <h1 className="preview-title">{activeNote.title}</h1>
				<Markdown className="markdown-preview">
					{activeNote.content}
				</Markdown>
      </div>
    </div>
  );
};

export default Main;
