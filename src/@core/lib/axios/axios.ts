import axios from 'axios'
import Cookies from 'js-cookie'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})
let token
// Check if the token is available in cookies
if (process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME) {
  token = Cookies.get(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME)
}

// Set the token in the headers if it exists
if (token) {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default axiosInstance
