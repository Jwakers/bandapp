import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://bandapp-1ddad.firebaseio.com/'
})

export default instance;