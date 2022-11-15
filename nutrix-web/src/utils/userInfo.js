import axios from 'axios'

// Get user data from API
export const getUserInfo = async () => {
    try {
        const result = await axios.get(`${import.meta.env.VITE_APP_SPREADSHEET_API}/userInfo`)
        const user = result.data.userInfo.find(user => user.deviceId === localStorage.getItem('deviceId'))
        return user
    } catch (error) {
        throw error
    }
}