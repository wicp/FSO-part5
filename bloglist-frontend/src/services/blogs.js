import axios from "axios"
const baseUrl = "/api/blogs"

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = (user, blog) => {
  const request = axios.post(baseUrl, blog, {
    headers: { Authorization: `bearer ${user.token}` },
  })
  return request
}

const blogService = {
  getAll,
  create,
}

export default blogService
