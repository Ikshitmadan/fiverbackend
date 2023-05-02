import axios from 'axios'
export const newRequest=axios.create({
    baseURL:"https://fiver-oxfq.onrender.com/api/",
    withCredentials:true
})
