import axios from "axios"

const baseUrl = '/api'

const login = async (credentials) => {
  const loginUrl = baseUrl + '/login'
  const response = await axios.post(loginUrl,credentials)
  return response.data
}

const userService = {
  login
}

export default userService