import { useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
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

    // update tag status in backend when edit tags
    const updateNoteTags = async (noteId, updatedTags) => {
        const currentTags = notes.find(note => note.id === noteId).tags.map(tag => tag.name)
        const areTagsSame = currentTags.length === updatedTags.length &&
            currentTags.every(tag => updatedTags.includes(tag))
        // prevent from create duplicated tags
        if (
            currentTags.some((tag, index) => currentTags.findIndex(t => t === tag) !== index)
        ) {
            toast.error("Don't put duplicated task's tags!")
            return
        }
        if (areTagsSame) {
            return
        } else {
            try {
                // find deleted and added tag
                const addedTags = updatedTags.filter(tag => !totalTags.includes(tag))
                const removedTags = totalTags.filter(tag => !updatedTags.includes(tag))
                // POST tag
                for (const tag of addedTags) {
                    await noteServices.create('tags', { name: tag })
                    console.log('added:', tag)
                }

                // update total tags
                const allTags = await noteServices.getAll('tags')
                setTotalTags(allTags.map(tag => tag.name))

                // DELETE tag (pass)
                for (const tag of removedTags) {
                    const isTagUsedElsewhere = notes.some(note =>
                        note.id !== noteId && note.tags.some(t => t.name === tag)
                    )
                    if (!isTagUsedElsewhere) {
                        const tagToDelete = allTags.find(t => t.name === tag)
                        if (tagToDelete) {
                            await noteServices.del('tags', tagToDelete.id)
                            console.log('deleted:', tagToDelete)
                        }
                    }
                }

                // PUT task
                const tagReference = updatedTags
                    .map(tagName => {
                        const tag = allTags.find(t => t.name === tagName)
                        return tag ? tag.id : null
                    })
                    .filter(tagId => tagId !== null)

                await noteServices.update('tasks', {
                    id: noteId,
                    name: notes.find(note => note.id === noteId).name,
                    tags: tagReference.join(',')
                })

                // update note
                const newNotes = await noteServices.getNotes()
                setNotes(newNotes)

                // notification for successful modification
                toast.success("Task's tags modified successfully!", {
                    autoClose: 2000
                })
            } catch (error) {
                console.log('failed to modify tags:', error)
                toast.error("Failed to modify task's tags!")
            }
        }
    }

    // update name in backend when edit name
    const updateNoteName = async (noteId, updateName) => {
        if (notes.find(note => note.id === noteId).name === updateName) {
            return
        }
        try {
            const isNameUnique = !notes.some(note => note.name === updateName)
            if (updateName && isNameUnique) {
                const tagIds = notes.find(note => note.id === noteId).tags.map(tag => tag.id).join(',')
                await noteServices.update('tasks', {
                    id: noteId,
                    name: updateName,
                    tags: tagIds
                })
                // update note
                setNotes(prevNotes =>
                    prevNotes.map(note =>
                        note.id === noteId ? { ...note, name: updateName } : note
                    )
                )
                // notification for successful modification
                toast.success("Task's name modified successfully!", {
                    autoClose: 2000
                })
            } else {
                toast.error("Task name must be unique and not empty!")
            }

        } catch (error) {
            console.log('failed to modify:', error)
            toast.error("Failed to modify task!")
        }
    }

    // delete note
    const handleDeleteNote = async (noteId) => {
        try {
            await noteServices.del('tasks', noteId)
            setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
            toast.success("Note deleted successfully!", { autoClose: 2000 })
        } catch (error) {
            console.log('failed to delete note:', error)
            toast.error("Failed to delete note!")
        }
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
                                        selectedTags.length === 0 || selectedTags.every(selectedTag => note.tags.some(tag => tag.name === selectedTag))
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
                                                    <Note note={note} onStatusChange={handleStatusChange} onUpdateTags={updateNoteTags} onUpdateName={updateNoteName} onDeleteNote={handleDeleteNote} />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            {/* enable toast notification */}
            <ToastContainer position="top-right" closeOnClick pauseOnHover />
        </div>
    )
}

export default Overview
