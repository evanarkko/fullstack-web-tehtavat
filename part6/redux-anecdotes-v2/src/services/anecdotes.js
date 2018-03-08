import axios from 'axios'

const url = "http://localhost:3004/anecdotes"

const getAll = async () => {
    const response = await axios.get(url)
    return response.data
}

const createNew = async (content) => {
    const sendObject = {
        content: content,
        votes: 0
    }
    const res = await axios.post(url, sendObject)
    return res.data
}

const sendVote = async (anecdote) => {
    const id = anecdote.id
    const sendable = {
        content: anecdote.content,
        votes: anecdote.votes
    }
    const response = await axios.put(url + "/" + anecdote.id, sendable)
    return response.data
}

export default {getAll, createNew, sendVote}