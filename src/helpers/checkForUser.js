import axios from 'axios'
import server from '../server'

export default async function waitForServerResponse(payload) {
  console.log('running check from server')
  try {
    const response = await axios.get(`${server}/users/loggedin`)
    if (response.data) {
      return true
    } else {
      if (payload) {
        payload()
      }
      return false
    }
  } catch (error) {
    return false
  }
}
