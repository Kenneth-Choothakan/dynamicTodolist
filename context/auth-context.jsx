import {createContext, useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const AuthContext = createContext({
    token: '',
    isAuthenticated: false,
    authenticate: (token) => { },
    logout: () => { }
})

const AuthContextProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null)

    useEffect(() => {
     console.log("Auth token: ", authToken !== null)   
    })

    const authenticate = async (token) => {
        setAuthToken(token)
        await AsyncStorage.setItem('token', token)
    }

    const logout = () => {
        setAuthToken(null)
        AsyncStorage.removeItem('token')
    }

    const value = {
        token: authToken,
        isAuthenticated: authToken !== null? true: false,
        authenticate: authenticate,
        logout: logout
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider

