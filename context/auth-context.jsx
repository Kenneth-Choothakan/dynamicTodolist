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

    const authenticate = async (token) => {
       await AsyncStorage.setItem('token', token)
       setAuthToken(token)
    }

    const logout = async () => {
        await AsyncStorage.removeItem('token')
        setAuthToken(null)   
    }
    
    const value = {
        token: authToken,
        isAuthenticated: authToken !== null? true: false,
        authenticate: authenticate,
        logout: logout
    }

    console.log('CONTEXT 0', value.token)

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider

