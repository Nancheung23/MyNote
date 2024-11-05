import React, { useState } from "react"
import "react-toastify/dist/ReactToastify.css"
import { FaEdit } from "react-icons/fa"

// 2 callback parameters
const Note = ({ note, onStatusChange, onUpdateTags }) => {
    // set initial status
    let lastType = 0
    if (note.timestamps.length > 0) {
        lastType = note.timestamps[note.timestamps.length - 1].type
    }
    const [isActivated, setIsActivated] = useState(lastType === 0 ? true : false)
    // default status: is not editing
    const [isEditing, setIsEditing] = useState(false)
    // new tags: in note's tags array
    const [newTags, setNewTags] = useState(note.tags.map(tag => tag.name).join(','))


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

    // handle editing toggle
    const toggleEditing = () => setIsEditing(!isEditing)

    // tags editing
    const handleTagChange = (e) => setNewTags(e.target.value)

    // handle submit
    const handleSubmit = () => {
        const updatedTags = newTags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
        onUpdateTags(note.id, updatedTags)
        setIsEditing(false)
    }

    return (
        <div className="flex items-center justify-between bg-white rounded-lg p-4 max-w-md mx-auto space-x-4">
            {/* title */}
            <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{note.name}</h2>
            </div>
            {/* tags */}
            <div className="flex flex-wrap gap-2">
                {isEditing ? (
                    <input
                        type="text"
                        value={newTags}
                        onChange={handleTagChange}
                        onBlur={handleSubmit}
                        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                        className="border border-gray-300 rounded px-2 py-1 text-xs"
                        placeholder="Enter tags separated by commas"
                        autoFocus
                    />
                )
                    :
                    (
                        note.tags.map(tag => (
                            <span key={tag.id || tag.name} className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                                {tag.name}
                            </span>
                        )))}
            </div>
            {/* button */}
            <div className="flex flex-col items-center">
                <button onClick={toggleEditing} className="ml-4 text-gray-500 hover:text-gray-700">
                    <FaEdit size={16} />
                </button>
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
