import axios from 'axios'

const axiosBase = axios.create({
    baseURL: 'https://localhost:8000/api'
})

export default axiosBase