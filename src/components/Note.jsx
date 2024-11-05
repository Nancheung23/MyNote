import React, { useState, Fragment } from "react"

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
        <div className="flex items-center justify-between bg-white rounded-lg p-4 max-w-md mx-auto space-x-4">
            {/* title */}
            <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{note.name}</h2>
            </div>
            {/* tags */}
            <div className="flex flex-wrap gap-2">
                {note.tags.map(tag => (
                    <span key={tag.id} className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                        {tag.name}
                    </span>
                ))}
            </div>
            {/* button */}
            <div className="flex flex-col items-center">
                <div
                    onClick={toggleStatus}
                    className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${isActivated ? 'bg-green-500' : 'bg-red-500'}`}
                >
                    <div
                        className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isActivated ? 'translate-x-8' : 'translate-x-0'}`}
                    ></div>
                </div>
                {/* <p className="mt-2 text-center font-semibold text-gray-800">
                    {isActivated ? 'Activated' : 'Deactivated'}
                </p> */}
            </div>
        </div>
    )
}

export default Note
