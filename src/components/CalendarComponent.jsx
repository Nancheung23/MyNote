import React from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const CalendarComponent = ({ notes, onDateSelect }) => {
    const getTileContent = ({ date, view }) => {
        if (view === 'month') {
            const matchingTimeStamps = notes.flatMap(note =>
                note.timestamps.filter(ts => new Date(ts.timestamp).toDateString() === date.toDateString())
            )
            if (matchingTimeStamps.length > 0) {
                return (
                    <div className='calendarMark'>
                        {matchingTimeStamps.some(ts => ts.type === 0) && <span className='start-dot'>●</span>}
                        {matchingTimeStamps.some(ts => ts.type === 1) && <span className='end-dot'>●</span>}
                    </div>
                )
            }
        }
    }
    const handleDateClick = (date) => {
        const notesOnDate = notes.filter(note =>
            note.timestamps.some(ts => new Date(ts.timestamp).toDateString() === date.toDateString())
        )
        onDateSelect(date, notesOnDate)
    }

    return (
        <div className='calendarContainer'>
            <Calendar
                onClickDay={handleDateClick}
                tileContent={getTileContent}
            />
        </div>
    )
}

export default CalendarComponent