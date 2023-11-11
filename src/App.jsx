import { useEffect, useReducer, useState } from "react";
import uuid from "react-uuid";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";

function App() {
  const [activeNote, setActiveNote] = useState(false);
  const [notes, notesDispatch] = useReducer((prevNotes, { type, id, updNote }) => {
    switch (type) {
      case "ADD": {
        const newNote = {
          id: uuid(),
          title: "新しいノート",
          content: "新しいノート内容" + uuid(),
          modDate: Date.now(),
        };
        return [...prevNotes, newNote];
      }
      case "DEL": {
        const filterNotes = [...prevNotes];
        return filterNotes.filter((note) => note.id !== id);
      }
      case "UPD": {
        // 修正された新しいノートの配列を返す
        const updatedNotesArray = prevNotes.map((note) => {
          if (note.id === updNote.id) {
            return updNote;
          } else {
            return note;
          }
        });
        return updatedNotesArray;
      }
    }
  }, JSON.parse(localStorage.getItem("notes")) || []);

  const onAddNote = () => {
    notesDispatch({ type: "ADD" });
  };

  const onDeleteNote = (id) => {
    notesDispatch({ type: "DEL", id: id });
  };
  
  const onUpdateNote = (updatedNote) => {
    notesDispatch({ type: 'UPD',  updNote: updatedNote});
  };

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  };

  useEffect(() => {
    // ローカルストレージにノートを保存する
    localStorage.setItem("notes", JSON.stringify(notes));
  },[notes]);

  useEffect(() => {
    setActiveNote(notes[0].id);
  },[])

  return (
    <div className="App">
      <Sidebar
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        notes={notes}
        setActiveNote={setActiveNote}
        activeNote={activeNote}
      />
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
    </div>
  );
}

export default App;
