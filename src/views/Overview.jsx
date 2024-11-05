import { useEffect, useState } from "react"
import noteServices from '../services/noteServices'
import Note from "../components/Note"
import '../assets/styles/overview.css'
import Dropdown from "../components/Dropdown"
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'

const Overview = () => {
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)
    const [totalTags, setTotalTags] = useState([])
    const [selectedTags, setSelectedTags] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const mergedData = await noteServices.getNotes()
                setNotes(mergedData)
                // set unique tags
                const uniqueTags = [...new Set(mergedData.flatMap(note => note.tags.map(tag => tag.name)))]
                setTotalTags(uniqueTags)
            } catch (error) {
                console.log('failed to load data...', error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    if (loading) {
        return <p>Loading...</p>
    }

    // Update note status in backend when toggled
    const handleStatusChange = async (noteId, newTimestamp) => {
        // Update frontend state with new timestamp
        const updateNotes = notes.map(note => {
            if (note.id === noteId) {
                return {
                    ...note,
                    timestamps: [...note.timestamps, newTimestamp]
                }
            }
            return note
        })
        setNotes(updateNotes)

        // Create new timestamp in backend
        try {
            await noteServices.create('timestamps', {
                timestamp: newTimestamp.timestamp.toISOString().replace('T', ' ').replace('Z', ''),
                task: newTimestamp.task,
                type: newTimestamp.type
            })
            console.log('update time')
        } catch (error) {
            console.log('failed to update time', error)
        }
    }

    // Handle drag and drop reordering
    const handleDragEnd = (result) => {
        const { source, destination } = result

        // If no destination, exit
        if (!destination) return

        // Reorder notes based on drag and drop result
        const reorderedNotes = Array.from(notes)
        const [movedNote] = reorderedNotes.splice(source.index, 1)
        reorderedNotes.splice(destination.index, 0, movedNote)

        setNotes(reorderedNotes)
    }

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Task Overview</h1>

            <div className="mb-6">
                <label className="text-lg font-semibold text-gray-700 mr-4">Select Tags</label>
                <Dropdown
                    options={totalTags}
                    selectedOptions={selectedTags}
                    onChange={setSelectedTags}
                    className="inline-block w-1/3"
                />
            </div>

            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="notes">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                        >
                            {
                                notes
                                    .filter(note =>
                                        selectedTags.length === 0 || note.tags.some(tag => selectedTags.includes(tag.name))
                                    )
                                    .map((note, index) => (
                                        <Draggable key={note.id} draggableId={note.id.toString()} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                                                >
                                                    <Note note={note} onStatusChange={handleStatusChange} />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}

export default Overview
