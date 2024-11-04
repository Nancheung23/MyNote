import React from "react";

const Note = ({ note }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 m-4 w-full max-w-sm">
            <h2 className="text-xl font-bold mb-2 text-gray-800">{note.name}</h2>

            <div className="mb-3">
                <h3 className="text-lg font-semibold text-gray-600">Tags</h3>
                <ul className="flex flex-wrap gap-2 mt-1">
                    {note.tags.map(tag => (
                        <li
                            key={tag.id}
                            className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-sm"
                        >
                            {tag.name}
                        </li>
                    ))}
                </ul>
            </div>
            {/* 
            <div>
                <h3 className="text-lg font-semibold text-gray-600">Timestamps</h3>
                <ul className="space-y-1 mt-1">
                    {note.timestamps.map(timestamp => (
                        <li key={timestamp.id} className="flex justify-between text-sm text-gray-700">
                            <span>{timestamp.timestamp}</span>
                            <span className={timestamp.type === 0 ? "text-green-500" : "text-red-500"}>
                                {timestamp.type === 0 ? "Start" : "End"}
                            </span>
                        </li>
                    ))}
                </ul>
            </div> */}
        </div>
    )
}

export default Note
