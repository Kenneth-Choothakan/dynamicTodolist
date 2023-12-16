import { View, Text, TextInput, Button} from "react-native";
import { useState } from "react";
import { AuthContext } from "./context/auth-context";
import {useContext} from 'react'

import axios from "axios";

export default function Login({navigation}) {
    let[username, setUsername] = useState('')
    let[password, setPassword] = useState('')
    let[message, setMessage] = useState('')
    const authContext = useContext(AuthContext)

    function changeUser(val) {
        setUsername(val)
    }
    function changePass(val) {
        setPassword(val)
    }
    function signup() {
        navigation.navigate('Sign Up')
    }
    async function submit() {
        try{
            const result = await axios.post('https://1d6a-73-222-172-16.ngrok-free.app/api/auth/login', {
                username: username,
                password: password
            });
            console.log("This is from login: ",result)
            const user = result.data
            console.log("User data: ", user)
            authContext.authenticate("hello")
          
        } catch(error) {
            setMessage('Username or password is incorrect')
            console.log('HERE: ', error.message)
        }
       
    }
    return <View>
        <TextInput onChangeText={(val) => changeUser(val)} placeholder="Username" style={{textAlign: "center", borderWidth: 2.5, borderRadius: 5, marginTop: 2}}/>
        <TextInput onChangeText={(val) => changePass(val)} placeholder="Password" style={{textAlign: "center", borderWidth: 2.5, borderRadius: 5, marginTop: 2, marginBottom: 4}}/>
        <Button title='Submit' onPress={submit} color="#841584"/>
        <Text style={{color: "red", textAlign: "center"}}>{message}</Text>
        <Text onPress={signup} style = {{textAlign: "center", color: "blue"}}>Don't have an account?</Text>
    </View>
}