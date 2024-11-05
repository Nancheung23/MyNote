import axios from 'axios'

const baseUrl = import.meta.env.VITE_BASE_URL || 'http://127.0.0.1:3010/'

console.log(`API base URL: ${baseUrl}`)

// common request function
const request = async (method, category, data = null) => {
    const url = `${baseUrl}${category}`
    try {
        const response = await axios({ method, url, data })
        console.log(`${method.toUpperCase()} ${category} successful`, data || '')
        return response.data
    } catch (error) {
        console.error(`Failed to ${method} ${category}:`, error)
        return null
    }
}

// specific method
const getAll = (category) => request('get', category)
const create = (category, newObject) => request('post', category, newObject)
const update = (category, newObject) => request('put', category, newObject)
const del = (category) => request('delete', category)

const getNotes = async () => {
    try {
        const [tasks, tags, timestamps] = await Promise.all([
            getAll('tasks'),
            getAll('tags'),
            getAll('timestamps')
        ])

        // mergedData
        const mergedData = tasks.map(task => {
            const tagNames = task.tags.split(',').map(tagId => parseInt(tagId))
                .map(id => tags.find(tag => tag.id === id))
                .filter(Boolean)
                .map(tag => ({ id: tag.id, name: tag.name }))

            const timestampsForTask = timestamps.filter(timestamp => timestamp.task === task.id)
                .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))

            return {
                ...task,
                tags: tagNames,
                timestamps: timestampsForTask
            }
        })

        return mergedData
    } catch (error) {
        console.error('Failed to fetch and merge notes data:', error)
        throw error
    }
}

export default { getAll, create, update, del, getNotes }
