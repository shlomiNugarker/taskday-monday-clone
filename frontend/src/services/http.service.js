import Axios from 'axios'
// import { router } from '@/router'

const BASE_URL =
  process.env.NODE_ENV === 'production' ? '/api/' : '//localhost:3030/api/'

var axios = Axios.create({
  withCredentials: true,
})

export const httpService = {
  get(endpoint, data) {
    return ajax(endpoint, 'GET', data)
  },
  post(endpoint, data) {
    return ajax(endpoint, 'POST', data)
  },
  put(endpoint, data) {
    return ajax(endpoint, 'PUT', data)
  },
  delete(endpoint, data) {
    return ajax(endpoint, 'DELETE', data)
  },
}

async function ajax(endpoint, method = 'GET', data = null) {
  try {
    const res = await axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      data,
      params: method === 'GET' ? data : null,
      timeout: 15000, // 15 second timeout
    })
    return res.data
  } catch (err) {
    console.error(`API Error: ${method} ${endpoint}`, err.message)
    
    // Log more detailed information for debugging
    if (err.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response data:', err.response.data)
      console.error('Response status:', err.response.status)
    } else if (err.request) {
      // The request was made but no response was received
      console.error('No response received:', err.request)
    }
    
    if (err.response && err.response.status === 401) {
      // Depends on routing startegy - hash or history
      // window.location.assign('/#/login')
      // window.location.assign('/login')
      // router.push('/login')
    }
    throw err
  }
}
