import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newPerson) => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data);
}

const remove = (id) => {

    const request = axios.delete(`${baseUrl}/${id}`)
    console.log(request)
    return request.then(response => response.data)
}

const updateNumber = (id, personWithNewNumber) => {
    personWithNewNumber.id = id
    const request = axios.put(`${baseUrl}/${id}`, personWithNewNumber)
    return request.then(response => response.data)
}

export default {getAll, create, remove, updateNumber}