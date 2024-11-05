import { useEffect, useState } from "react"
import noteServices from '../services/noteServices'
import Note from "../components/Note"
import '../assets/styles/overview.css'

const Overview = () => {
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                // use promise.all collect all elements
                const [tasks, tags, timestamps] = await Promise.all([
                    noteServices.getAll('tasks'),
                    noteServices.getAll('tags'),
                    noteServices.getAll('timestamps'),
                ])

                // merge to one note data
                const mergedData = tasks.map(task => {
                    const tagNames = []
                    // use id to find tag
                    task.tags.split(',').map(tagId => parseInt(tagId)).forEach(id => {
                        const tag = tags.find(tag => tag.id === id)
                        if (tag) {
                            tagNames.push({ id: id, name: tag.name })
                        }
                    })

                    // combine sorted timestamps, in time order
                    const times = timestamps.filter(timestamp => timestamp.task === task.id)
                        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))

                    return {
                        ...task,
                        tags: tagNames,
                        timestamps: times
                    }
                })

                console.log(mergedData)
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

    // when toggle, update status in backend
    const handleStatusChange = async (noteId, newTimestamp) => {
        // according to callback value update frontend status
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

        // newId for timestamp 
        try {
            await noteServices.create('timestamps',
                {
                    timestamp: newTimestamp.timestamp.toISOString().replace('T', ' ').replace('Z', ''),
                    task: newTimestamp.task,
                    type: newTimestamp.type
                }
            )
            console.log('update time')
        } catch (error) {
            console.log('failed to update time', error)
        }
    }

    return (
        <div>
            <h1>Overview</h1>
            <div>
                {notes.map(note => (
                    <div key={note.id}>
                        <Note note={note} onStatusChange={handleStatusChange} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Overview
