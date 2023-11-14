import { useEffect, useReducer, useState } from "react";
import uuid from "react-uuid";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import noteApi from "./api/api.js";

const App = () => {
  const [activeNote, setActiveNote] = useState(false);
  const notesDispatch = (prevNotes, { type, id, updNote }) => {
    switch (type) {
      case "INIT": {
        return [...updNote];
      };
      case "ADD": {
        return [...prevNotes, updNote];
      };
      case "DEL": {
        const filterNotes = [...prevNotes];
        return filterNotes.filter((note) => note.id !== id);
      };
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
      };
    };
  };

  const [notes, dispatch] = useReducer(notesDispatch, []);

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "新しいノート",
      content: "新しいノート内容" + uuid(),
      modDate: Date.now(),
    };
    noteApi.post(newNote).then(newNote => {
      dispatch({ type: "ADD", updNote: newNote});
    });
  };

  const onDeleteNote = (id) => {
    noteApi.delete(id).then(() => {
      dispatch({ type: "DEL", id: id });
    })
  };
  
  const onUpdateNote = (updatedNote) => {
    noteApi.patch(updatedNote).then(() => {
      dispatch({ type: 'UPD',  updNote: updatedNote});
    });
  };

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  };

  useEffect(() => {
    notes.length !== 0 && setActiveNote(notes[0].id);
    noteApi.getAll().then(notes => {
      dispatch({ type: 'INIT',  updNote: notes});
    });
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
