import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { AuthContext } from './context/auth-context';
export default function Home({navigation}) {
    //console.log("HOME SCREEN: ", props)
    let[titles,setTitles] = useState('')
    let[details,setDetails] = useState('')
    let[list,setList] = useState([])
    let [error, setError] = useState(false)
    const context = useContext(AuthContext)
    //let userId = props.route.params.user.id

    useEffect(() => {
    
        const fetchTodosFromUser = async () => {
            try{
                const result = await axios.get(`https://51f4-73-222-172-16.ngrok-free.app/api/todos/getTodos/${userId}`)

            let todos = result.data.map((todo) => {
                return (<View>
                    <Text>{todo.title}</Text>
                    <Button title='remove' onPress={remove(val)} val={todo.id}/>
                </View>)
            })

            }catch(e){
                setError(true)
            }
            
        }

        fetchTodosFromUser()

    }, [])

    async function remove(id) {
        try{
            const result = await axios.post(`https://216e-67-160-237-70.ngrok-free.app/api/todos/removeTodo/${id}`)
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
            postedby: userId
            }
        try{
            let result = await axios.post('https://216e-67-160-237-70.ngrok-free.app/api/todolist/createTodo', new_post)
            console.log("Result from home: ", result)
        }
        catch(err){
            console.log(err)
        }
      
    }

    function logout() {
        context.logout()
        
    }

    if(error){
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
