import React, { useState, useEffect } from "react";
import './note.css';

interface NoteProps {
    value: string;
    children?: React.ReactNode; 
    color?: string;
}

const Note: React.FC<NoteProps> = ({ value, children, color }) => {
    const [noteColor, setNoteColor] = useState<string | undefined>(color);

    useEffect(() => {
        if (!noteColor) {
            const noteColors = ['#DBD296', '#AEDB96', '#96DBDA', '#DB96D0', '#DBA096'];
            const randomIndex = Math.floor(Math.random() * noteColors.length);
            const randomColor = noteColors[randomIndex];
            setNoteColor(randomColor);
        }
    }, [noteColor]);

    const style = {
        backgroundColor: noteColor,
    };

    return (
        <div className="note" style={style}>
            <p className="note-content">{value}</p>
            {children}
        </div>
    );
}

export default Note;




