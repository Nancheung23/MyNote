import React from "react";

const Note = ({ note }) => {
    return (
        <div>
            <h2>{note.name}</h2>
            <ul>
                {note.tags.map(tag =>
                    <li key={tag.id}>{tag.name}</li>
                )}
            </ul>
            <ul>
                {note.timestamps.map(timestamp =>
                    <li key={timestamp.id}><span>{timestamp.timestamp}</span><span>{timestamp.type}</span></li>
                )}
            </ul>
        </div>
    )
}

export default Note