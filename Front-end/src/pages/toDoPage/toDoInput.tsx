import React, { useState } from 'react';
import Input from '../../components/input/input';

interface AddToDoInputProps {
  onAddToDo: (toDoName: string) => void;
}

const AddToDoInput: React.FC<AddToDoInputProps> = ({ onAddToDo }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      onAddToDo(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <Input
      placeholder="Enter task..."
      value={inputValue}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
    />
  );
};

export default AddToDoInput;
