import { useEffect, useState } from "react"
import noteServices from '../services/noteServices'
import Note from "../components/Note"
import CalendarComponent from "../components/CalendarComponent"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import '../assets/styles/overview.css'

const Overview = () => {
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedDate, setSelectedDate] = useState(null)
    const [selectedNotes, setSelectedNotes] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [tasks, tags, timestamps] = await Promise.all([
                    noteServices.getAll('tasks'),
                    noteServices.getAll('tags'),
                    noteServices.getAll('timestamps'),
                ])

                const mergedData = tasks.map(task => {
                    const tagNames = []
                    task.tags.split(',').map(tagId => parseInt(tagId)).map(id => tags.find(tag => {
                        if (tag.id === id) {
                            tagNames.push({ id: id, name: tag.name })
                        }
                    }))

                    const times = timestamps.filter(timestamp => timestamp.task === task.id)
                        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
                    return {
                        ...task,
                        tags: tagNames,
                        timestamps: times
                    }
                })

                setNotes(mergedData)
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

    // Handle date selection from calendar
    const handleDateSelect = (date, notesOnDate) => {
        setSelectedDate(date)
        setSelectedNotes(notesOnDate)
    }

    // Handle drag and drop reordering
    const handleDragEnd = (result) => {
        const { destination, source } = result
        if (!destination) return

        const reorderedNotes = Array.from(notes)
        const [movedNote] = reorderedNotes.splice(source.index, 1)
        reorderedNotes.splice(destination.index, 0, movedNote)

        setNotes(reorderedNotes)
    }

    return (
        <div className="flex h-screen p-4 space-x-4">
            {/* left: calendar */}
            <div className="w-1/3 bg-gray-100 p-4 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold underline mb-4">Overview</h1>
                <CalendarComponent notes={notes} onDateSelect={handleDateSelect} />
                {selectedDate && (
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold mb-2">Details on {selectedDate.toDateString()}</h2>
                        {selectedNotes.map(note => (
                            <div key={note.id}>
                                <Note note={note} />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* right: note card */}
            <div className="w-2/3 bg-white p-4 rounded-lg shadow-md overflow-y-auto">
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="notes">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="space-y-4"
                            >
                                {notes.map((note, index) => (
                                    <Draggable key={note.id} draggableId={note.id.toString()} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="bg-white p-4 rounded-lg shadow-lg"
                                            >
                                                <Note note={note} />
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
        </div>
    )
}

export default Overview
