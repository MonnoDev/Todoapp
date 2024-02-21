import React from 'react';
import { TiDeleteOutline } from "react-icons/ti";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDoneOutline } from "react-icons/md";
import './toDo.css'; 

interface ToDoItemProps {
  text: string;
  index: number; // Added index prop to identify the position of the item
  onDelete: () => void;
  onEdit: (newText: string) => void;
}

const ToDo: React.FC<ToDoItemProps> = ({ text, index, onDelete, onEdit }) => {
  const [isDone, setIsDone] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedText, setEditedText] = React.useState(text);

  const handleDoneClick = () => {
    setIsDone(!isDone);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    onEdit(editedText);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedText(text);
    setIsEditing(false);
  };

  return (
    <li>
      <div className="todo-item">
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedText}
              onChange={e => setEditedText(e.target.value)}
            />
            <MdOutlineDoneOutline onClick={handleSaveEdit}/>
            <TiDeleteOutline onClick={handleCancelEdit}/>
          </>
        ) : (
          <>
            <div className={`todo-text ${isDone ? 'done' : ''}`}>{text}</div>
            <div className="icon-container">
              <FiEdit2 onClick={handleEditClick} />
              <TiDeleteOutline onClick={onDelete} />
              <MdOutlineDoneOutline onClick={handleDoneClick} />
            </div>
          </>
        )}
      </div>
    </li>
  );
};

export default ToDo;
