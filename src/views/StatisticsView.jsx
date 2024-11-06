import React, { useEffect, useState } from "react"
import noteServices from '../services/noteServices'

const StatisticsView = () => {
    const [notes, setNotes] = useState([])

    // fetch data for all notes
    useEffect(() => {
        const fetchData = async () => {
            const notesData = await noteServices.getNotes()
            try {
                setNotes(notesData)
            } catch (error) {
                console.log('fetching error...', error)
            }
        }
        fetchData()
    }, [])

    return (
        <div>
            <h1>Statistics</h1>
            <h2>Filter</h2>
            <div>
                <h3>time series</h3>
                <div>
                    {
                        notes.map(note =>
                            <ul key={note.id}>
                                {note.timestamps.map(timestamp =>
                                    <li key={timestamp.id}>{timestamp.timestamp}</li>
                                )}
                            </ul>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default StatisticsView