import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View, TextInput, Button, SafeAreaView } from 'react-native';
import { useState, useContext, useEffect, useLayoutEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import {AuthContext} from './context/auth-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AuthContextProvider from './context/auth-context';
import SignUp from './signUp';
import Home from './home';
import Login from './login';

const Stack = createNativeStackNavigator()

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName='Sign Up' screenOptions={{}}>
      <Stack.Screen name="Sign Up" component={SignUp} options={{headerLeft: null}} />
      <Stack.Screen name="Login" component={Login} options={{headerLeft: null}}/>
      <Stack.Group>
      <Stack.Screen name="Home" component={Home} options={{headerLeft: null}}/>
      </Stack.Group>
    </Stack.Navigator>
  )
}

const AuthenticatedStack = () => {
  return (
    <Stack.Navigator initialRouteName='Home'>
       <Stack.Screen name="Home" component={Home} options={{headerLeft: null}}/>
    </Stack.Navigator>
  )
}

export default function App(){
  return (
    <AuthContextProvider>
        <Root/>
    </AuthContextProvider>
  )
}
function Root(){
  const [userToken, setUserToken] = useState(null)
  const context = useContext(AuthContext)
  
  useEffect(() => {
    console.log('CONTEXT: ', context.token)
    const myFunc = async () => {
      let res = await AsyncStorage.getItem('token')
      console.log('KEYS???: ', res)
      setUserToken(res)
    }
    myFunc();
  })

  if(userToken === null){
    console.log('RUNNING!!!')
    return (
    
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    
    )
  }
  
  //const renderStack = userToken !== null? <AuthenticatedStack /> : <AuthStack />
  return (
      <NavigationContainer>
        <AuthenticatedStack />
      </NavigationContainer>
    
  );

}


// export default function App() {
//   const [signedIn, setSignedIn] = useState(false)
//   let [s, setS] = useState(false)
//   let [l,setL] = useState(false)

//   function signIn() {
//     setSignedIn(true)
//  }  



//   if(signedIn === false){
//     console.log('here')
//     return (
      
//         <NavigationContainer>
//           <Stack.Navigator initialRouteName='Sign Up' screenOptions={{signIn: signIn}}>
//             <Stack.Screen name="Sign Up" component={SignUp} options={{headerLeft: null}} />
//             <Stack.Screen name="Login" component={Login} options={{headerLeft: null}}/>
//             <Stack.Group>
//             <Stack.Screen name="Home" component={Home} options={{headerLeft: null}}/>
//             </Stack.Group>
//       </Stack.Navigator>
//       </NavigationContainer>

//     )  
//   }
//   return (
//     <View>
//        <NavigationContainer>
//        <Stack.Navigator initialRouteName='Home'>
//        <Stack.Screen name="Home" component={Home} options={{headerLeft: null}}/>
//         </Stack.Navigator>
//       </NavigationContainer>
//     </View>
//   );
// }
 {/* <Button title='Sign Up' onPress={sign} style={{position: 'relative', left:'51%', top:'50%'}}/> */}
      {/* <Button title='Login' onPress={log} style={{position: 'relative', left:'49%', top:'50%'}}/>  */}

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

  },
});
