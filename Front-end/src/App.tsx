import React, { useState } from 'react';
import ToDoInput from '../src/pages/toDoPage/toDoInput'
import Note from '.././src/components/note/note';
import ToDoItem from '.././src/pages/toDoPage/toDo';
import './App.css';

const chunkArray = (arr: any[], chunkSize: number) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunks.push(arr.slice(i, i + chunkSize));
  }
  return chunks;
};

const App: React.FC = () => {
  const [toDos, setToDos] = useState<string[]>([]);

  const handleAddToDo = (toDoName: string) => {
    setToDos([...toDos, toDoName]);
  };

  const toDoChunks = chunkArray(toDos, 10);

  const handleDelete = (index: number) => {
    setToDos(prevState => {
      const updatedToDos = [...prevState];
      updatedToDos.splice(index, 1);
      return updatedToDos;
    });
  };

  const handleEdit = (index: number, newToDoName: string) => {
    setToDos(prevState => {
      const updatedToDos = [...prevState];
      updatedToDos[index] = newToDoName;
      return updatedToDos;
    });
  };

  return (
    <div>
      <h1>What do I need to do today?</h1>
      <ToDoInput onAddToDo={handleAddToDo} />
      {toDoChunks.map((chunk, index) => (
        <Note key={index} value="">
          <ul>
            {chunk.map((toDo, idx) => (
              <ToDoItem
                key={idx}
                index={idx}
                text={toDo}
                onDelete={() => handleDelete(index * 10 + idx)}
                onEdit={(newText: string) => handleEdit(index * 10 + idx, newText)}
              />
            ))}
          </ul>
        </Note>
      ))}
    </div>
  );
};

export default App;

