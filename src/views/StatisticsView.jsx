import React, { useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import noteServices from "../services/noteServices"
import CalendarComponent from "../components/CalendarComponent"
import DateTimePicker from "react-datetime-picker"
import { Line } from "react-chartjs-2"
import "react-calendar/dist/Calendar.css"
import "react-datetime-picker/dist/DateTimePicker.css"
import { useTheme } from "../contexts/ThemeContext"

// Chart.js
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const StatisticsView = () => {
    const [notes, setNotes] = useState([])
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [chartData, setChartData] = useState(null)

    // get current theme
    const { theme } = useTheme()

    // Fetch data for all notes
    useEffect(() => {
        const fetchData = async () => {
            try {
                const notesData = await noteServices.getNotes()
                setNotes(notesData);
            } catch (error) {
                console.log("fetching error...", error)
            }
        }
        fetchData()
    }, [])

    // Handle date selection from the calendar
    const handleDateSelect = (date, notesOnDate) => {
        console.log("Selected date:", date)
        setSelectedNotes(notesOnDate)
    }

    // Handle chart update when date range changes
    useEffect(() => {
        if (startDate && endDate && startDate < endDate) {
            const timestamps = notes.flatMap(note =>
                note.timestamps.filter(ts => {
                    const tsDate = new Date(ts.timestamp)
                    return tsDate >= startDate && tsDate <= endDate && ts.type === 1
                })
            )

            const taskCountsByDate = timestamps.reduce((counts, ts) => {
                const dateKey = new Date(ts.timestamp).toDateString()
                counts[dateKey] = (counts[dateKey] || 0) + 1
                return counts
            }, {})

            const chartData = {
                labels: Object.keys(taskCountsByDate),
                datasets: [
                    {
                        label: "Completed Tasks",
                        data: Object.values(taskCountsByDate),
                        borderColor: "rgba(75, 192, 192, 1)",
                        backgroundColor: "rgba(75, 192, 192, 0.2)",
                        borderWidth: 1,
                    },
                ],
            }
            setChartData(chartData)
        }
    }, [startDate, endDate, notes])

    return (
        <div className={`p-8 min-h-screen ${theme.bgColor} ${theme.textColor}`}>
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Statistics</h1>

            {/* picker */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Calendar</h2>
                    <CalendarComponent notes={notes} onDateSelect={handleDateSelect} />
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Date Range</h2>
                    <div className="flex flex-col space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Start Date and Time
                            </label>
                            <DateTimePicker
                                value={startDate}
                                onChange={setStartDate}
                                maxDate={endDate || new Date()}
                                className="w-full h-10 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                End Date and Time
                            </label>
                            <DateTimePicker
                                value={endDate}
                                onChange={setEndDate}
                                minDate={startDate || new Date()}
                                className="w-full h-10 border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* chart */}
            <div className="bg-white p-6 rounded-lg shadow">
                {chartData ? (
                    <Line
                        data={chartData}
                        options={{
                            responsive: true,
                            scales: {
                                x: {
                                    title: {
                                        display: true,
                                        text: "Date",
                                    },
                                    type: "category",
                                },
                                y: {
                                    title: {
                                        display: true,
                                        text: "Number of Completed Tasks",
                                    },
                                    beginAtZero: true,
                                    ticks: {
                                        stepSize: 1,
                                        callback: function (value) { return Number.isInteger(value) ? value : null; }
                                    }
                                },
                            },
                        }}
                    />
                ) : (
                    <p className="text-center text-gray-600">Select a valid date range to view task statistics.</p>
                )}
            </div>
            <ToastContainer position="top-right" closeOnClick pauseOnHover />
        </div>
    )
}

export default StatisticsView
