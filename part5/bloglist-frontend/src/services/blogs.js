import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get("http://localhost:3003" + baseUrl)
  return request.then(response => response.data)
}

const createNew = (blog, token) => {
  console.log(token)
    const config = {
        headers: { 'Authorization': token }
    }
  const request = axios.post("http://localhost:3003" + baseUrl, blog, config)
  return request.then(response => response.data)
}

export default { getAll, createNew}