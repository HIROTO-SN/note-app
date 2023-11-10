import { useReducer, useState } from 'react'
import './App.css';
import Sidebar from "./components/Sidebar"
import Main from './components/Main';

function App() {
  // const [notes, setNotes] = useState([]);
  const [notes, notesDispatch] = useReducer((prevNotes, action) => {
    switch(action) {
      case 'add': {
        const newNote = {
          id: Math.random(),
          title: '新しいノート',
          content: '新しいノート内容',
          modDate: Date.now(),
        };
        console.log(newNote);
        return [...prevNotes, newNote];
      }
    }
  }, []);

  const onAddNote = () => {
    notesDispatch('add');
  };

  return (
    <div className='App'>
      <Sidebar onAddNote={onAddNote} notes={notes}/>
      <Main />
    </div>
  )
}

export default App;
