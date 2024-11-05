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

export default { getAll, create, update, del }
