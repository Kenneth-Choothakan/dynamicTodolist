import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { AuthContext } from './context/auth-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Home() {
    //console.log("HOME SCREEN: ", props)
    let[titles,setTitles] = useState('')
    let[details,setDetails] = useState('')
    let[list,setList] = useState([])
    let [error, setError] = useState(false)
    let[userId, setUserId] = useState(null)
    let[todoData, setTodoData] = useState(null)
    const authContext = useContext(AuthContext)
    //let userId = props.route.params.user.id
    useEffect(() => {
        async function getId() {
            let res = await AsyncStorage.getItem("token")
            console.log("home token: ", res)
            setUserId(res)
        }
        getId()
        console.log('RESULT USERID: ', userId)
    }, [])

    useEffect(() => {
        const fetchTodosFromUser = async () => {
            console.log('calling get todos')
            try{
                const result = await axios.get(`https://9092-73-222-172-16.ngrok-free.app/api/todolist/getTodos/${userId}`)
        
            let todos = result.data.data.map((todo) => {
                return (<View>
                    <Text>{todo['title']}</Text>
                </View>)
            })
            
            setTodoData(todos)
            }catch(e){
                
                console.log('ERROR FROM FETCH!!!!!!: ', e.message) //
                //setError(true)
            }
            
        }

        fetchTodosFromUser()
    }, [])

    async function remove(id) {
        try{
            const result = await axios.post(`https://9092-73-222-172-16.ngrok-free.app/api/todolist/removeTodo/${id}`)
        } catch(e) {
            console.log('remove error: ', e)
        }
    }

    function changeTitles(val) {
        setTitles(val)
    }

    function changeDetails(val) {
        setDetails(val)
    }
    
    async function submit() {
        const new_post = {
            title: titles,
            detail: details,
            user_id: userId
            }

            console.log('submit user id: ', new_post.user_id)
        try{
            let result = await axios.post('https://9092-73-222-172-16.ngrok-free.app/api/todolist/createTodo', new_post)
            console.log("Result from home: ", result.data)
        }
        catch(err){
            console.log('ERROR FROM SUBMIT: ', e)
            console.log(err)
        }
        
    }

    function logout() {
        authContext.logout()
    }

    if(error){
        console.log('ERROR RUNNING')
        return (
            <View>
        <View>
            {/* <Text>Welcome  {props.route.params.user['username']}</Text> */}
        </View>
        <View><Text>You dont have any posts</Text></View>
        <TextInput placeholder='Title' onChangeText={(val) => {changeTitles(val)}}/>
        <TextInput placeholder='Details' onChangeText={(val) => {changeDetails(val)}}/>
        <Button title='Submit' onPress={submit}/>
        <Button title='Log out' onPress={logout}/>
        </View>
        )
    }
   
    return (
        <View>
        <View>
            <Text>{todoData === null? 0: todoData}</Text>
            {/* <Text>Welcome  {props.route.params.user['username']}</Text> */}
        </View>
        <TextInput placeholder='Title' onChangeText={(val) => {changeTitles(val)}}/>
        <TextInput placeholder='Details' onChangeText={(val) => {changeDetails(val)}}/>
        <Button title='Submit' onPress={submit}/>
        {/* <Text>{todos}</Text> */}
        <Button title='Log out' onPress={logout}/>
        </View>
    );
    

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item_container: {
        border: "0.2rem solid red",
        borderRadius: 2,
        width: '100vw',
        marginTop: '2px',
        textAlign: 'center',

    }
    });}
