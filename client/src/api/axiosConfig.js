import axios from 'axios'

const axiosBase = axios.create({
    baseURL: 'https://forumbackend.salimtech.com/api',
});

export default axiosBase