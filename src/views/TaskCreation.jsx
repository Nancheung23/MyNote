import React, { useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import noteServices from '../services/noteServices'
import '../assets/styles/overview.css'
import { useNavigate } from "react-router-dom"
import { useTheme } from "../contexts/ThemeContext"


const TaskCreation = () => {
    const [newNoteName, setNewNoteName] = useState('')
    const [newNoteTags, setNewNoteTags] = useState('')
    // add function for selecting current tags
    const [selectedTags, setSelectedTags] = useState([])
    const [totalTags, setTotalTags] = useState([])
    const [loading, setLoading] = useState(true)
    // redirect
    const navigate = useNavigate()
    // get current theme
    const { theme } = useTheme()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const mergedData = await noteServices.getNotes()
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

    // prevent from create duplicated tags
    const hasDuplicateTags = (tags) => {
        return tags.some((tag, index) =>
            tags.findIndex(t => t === tag) !== index
        )
    }

    const handleCreate = async (e) => {
        e.preventDefault()

        // get input from form
        const newTimestamp = new Date().toISOString().replace('T', ' ').replace('Z', '')
        const inputTags = newNoteTags.split(',').map(tag => tag.trim())
        if (hasDuplicateTags(inputTags)) {
            toast.error("Don't put duplicated tags!")
            return
        }
        // filter non exist tags
        const finalTags = [...selectedTags, ...inputTags].filter(tag => tag)
        // filter new tag not included in tags
        const newTags = inputTags.filter(tag => !totalTags.includes(tag))
        try {
            // post tags
            for (const tag of newTags) {

                const createdTag = await noteServices.create('tags',
                    {
                        name: tag
                    })
                setTotalTags(prevTags => [
                    ...prevTags,
                    createdTag.name
                ])
            }
            // get update tags and references
            const updatedTags = await noteServices.getAll('tags')
            const tagReference = finalTags.map(tagName => {
                const tag = updatedTags.find(t => t.name === tagName)
                return tag ? tag.id : null
            }).filter(tagId => tagId !== null).join(',')

            // create task
            const createdTask = await noteServices.create('tasks', {
                name: newNoteName,
                tags: tagReference
            })

            // create timestamp
            await noteServices.create('timestamps', {
                timestamp: newTimestamp,
                task: createdTask.id,
                type: 0
            })

            // notification, redirect to '/Home', 2s delay
            toast.success("Task created successfully!", {
                autoClose: 2000
            })

            setTimeout(() => {
                navigate("/Home")
            }, 1000)
        } catch (error) {
            console.log('failed to create:', error)
            toast.error("Failed to create task!")
        }
    }

    const handleTagSelection = (tag) => {
        if (!newNoteTags.includes(tag)) {
            // put selected tags
            setNewNoteTags(prev => prev ? `${prev}, ${tag}` : tag)
        }
    }

    return (
        <div className={`p-8 min-h-screen ${theme.bgColor} ${theme.textColor}`}>
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create A Task</h1>
            <form onSubmit={handleCreate} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Task name</label>
                    <input type="text"
                        value={newNoteName}
                        onChange={e => setNewNoteName(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter task name"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Tags</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {totalTags.map((tag, index) => (
                            <button
                                key={`${tag}-${index}-${new Date().toISOString()}`}
                                type="button"
                                onClick={() => handleTagSelection(tag)}
                                className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                    <input type="text"
                        value={newNoteTags}
                        onChange={e => setNewNoteTags(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter tags separated by commas"
                    />
                    <p className="text-xs text-gray-500 mt-1">Separate tags with commas (e.g., "work, personal, urgent")</p>
                </div>
                <button type="submit"
                    className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition duration-200">
                    Create Note
                </button>
            </form>
            {/* enable toast notification */}
            <ToastContainer position="top-right" closeOnClick pauseOnHover />
        </div >
    )
}

export default TaskCreation