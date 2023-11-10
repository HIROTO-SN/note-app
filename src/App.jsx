import { useReducer, useState } from "react";
import uuid from "react-uuid";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";

function App() {
  const [activeNote, setActiveNote] = useState(false);
  const [notes, notesDispatch] = useReducer((prevNotes, { type, id }) => {
    switch (type) {
      case "ADD": {
        const newNote = {
          id: uuid(),
          title: "新しいノート",
          content: "新しいノート内容",
          modDate: Date.now(),
        };
        console.log(newNote);
        return [...prevNotes, newNote];
      }
      case "DEL": {
        const filterNotes = [...prevNotes];
        return filterNotes.filter((note) => note.id !== id);
      }
    }
  }, []);

  const onAddNote = () => {
    notesDispatch({ type: "ADD" });
  };

  const onDeleteNote = (id) => {
    notesDispatch({ type: "DEL", id: id });
  };

  return (
    <div className="App">
      <Sidebar
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        notes={notes}
        setActiveNote={setActiveNote}
        activeNote={activeNote}
      />
      <Main />
    </div>
  );
}

export default App;
