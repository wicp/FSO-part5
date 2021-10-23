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

const update = (user, blog) => {
  const blogWithoutUserJoin = {...blog, user:blog.user.id} 
  const request = axios.put(baseUrl + `/${blog.id}`, blogWithoutUserJoin, {
    headers: { Authorization: `bearer ${user.token}` },
  })
  return request
}

const blogService = {
  getAll,
  create,
  update,
}

export default blogService
