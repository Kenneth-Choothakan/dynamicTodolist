import { TextInput, View, Text, Button } from "react-native";
import { useState } from "react";
import myAxios from './CustomAxios.js'
import axios from 'axios'

export default function SignUp({navigation}) {
    let[username,setUsername] = useState('')
    let[password,setPassword] = useState('')
    let[message,setMessage] = useState('')
    console.log("PROPS: ", navigation)
    function changeUser(val) {
        setUsername(val)
        console.log(username)
    }
    function changePass(val) {
        setPassword(val)
        console.log(password)
    }
    function login() {
        navigation.navigate("Login")
    }
    const submit = async () => {
        console.log('calling')
        try{
            const result = await axios.post('https://51f4-73-222-172-16.ngrok-free.app/api/auth/register', {
                fullName: "kjfndfjvndsf",
                username: username,
                password:password
            })
            console.log("This is your ID: ", result.data.userId)
            if(result){
                navigation.navigate('Home',{
                    userId: result.data.userId
                })
            }
    }catch(err){
        setMessage('Username is taken')
    }
    }
    return <View>
        
        <TextInput onChangeText={(val) => changeUser(val)} placeholder="Username" style = {{textAlign: "center", borderWidth: 2.5, borderRadius: 5, marginTop:2}}/>
        <TextInput onChangeText={(val) => changePass(val)} placeholder="Password" style = {{textAlign: "center", borderWidth: 2.5, borderRadius: 5, marginTop: 2, marginBottom: 4}}/>
        <Button title='Submit' onPress={submit} color="#841584"/>
        <Text style={{color: "red", textAlign: 'center'}}>{message}</Text>
        <Text onPress={login} style={{textAlign: "center", color: "blue"}}>Already have an account?</Text>
    </View>
} 