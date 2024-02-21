import React from 'react';
import './input.css'

interface InputProps {
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ placeholder, value, onChange, onKeyPress }) => {
  return (
    <div className='input-container'>
      <input className='input'
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
    </div>
  );
};

export default Input;

