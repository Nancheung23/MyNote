import axios from 'axios'

const url = 'http://127.0.0.1:3010/'

// GET 'category'
const getAll = async (category) => {
    return axios.get(`${url}${category}`)
        .then(response => {
            console.log(`fetching all ${category}...\n`, response.data)
            return response.data
        })
        .catch(err => console.log(`failed to fetch ${category}!\n`, err)
        )
}

// POST 'create'
const create = async (category, newObject) => {
    return axios.post(`${url}${category}`, newObject)
        .then(response => {
            console.log(`create object in ${category}...\n`, newObject)
            return response.data
        })
        .catch(err => console.log(`failed to create in ${category}!\n`, err)
        )
}


export default { getAll, create }