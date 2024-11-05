import React, { useState } from "react"

const Note = ({ note, onStatusChange }) => {
    // set initial status
    let lastType = 0
    if (note.timestamps.length > 0) {
        lastType = note.timestamps[note.timestamps.length - 1].type
    }
    const [isActivated, setIsActivated] = useState(lastType === 0 ? true : false)

    // handle toggle
    const toggleStatus = () => {
        const newType = isActivated ? 1 : 0
        const timestamp = new Date()
        setIsActivated(prev => !prev)
        console.log(`update new timestamp: ${timestamp}`)
        onStatusChange(
            note.id,
            {
                timestamp: timestamp,
                task: note.id,
                type: newType
            }
        )
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-4 max-w-sm mx-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{note.name}</h2>

            <div className="mb-4">
                <ul>
                    {note.tags.map(tag => (
                        <li key={tag.id} className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded">
                            {tag.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div
                onClick={toggleStatus}
                className={`w-24 h-10 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${isActivated ? 'bg-green-500' : 'bg-red-500'
                    }`}
            >
                <div
                    className={`w-8 h-8 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isActivated ? 'translate-x-12' : 'translate-x-0'
                        }`}
                ></div>
            </div>
            <p className="mt-2 text-center font-semibold text-gray-800">
                {isActivated ? 'Activated' : 'Deactivated'}
            </p>
        </div>
    )
}

export default Note
