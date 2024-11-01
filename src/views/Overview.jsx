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

                    const times = timestamps.filter(timestamp => timestamp.task === task.id).sort()
                    return {
                        ...task,
                        tags: tags.length >= 1 ? tagNames : [],
                        timestamps: times.length >= 1 ? times : []
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
        return <p>loading...</p>
    }

    return (
        <div>
            <h1>Overview</h1>
            {notes.map(note => {
                return <Note key={note.id} note={note} />
            })}
        </div>
    )
}


export default Overview