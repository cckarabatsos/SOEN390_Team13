import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button,ImageBackground,TextInput, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import loginBack from '../Components/Images/logInBackground.png'

import Login from './Pages/Login';
import Icon from 'react-native-vector-icons/Entypo';


const Stack = createNativeStackNavigator();
const image = require('./Components/Images/logInBackground.png')

function LogoTitle2() {
  return (
    <View
    style={{flexDirection:'row', flexWrap:'wrap',justifyContent:'center', alignItems:'center'}}>
      
    <Icon name="log-out" size={50} color="black" />
    <Text  style={{fontSize:30}}> LinkedOut</Text>


    </View>
    
  );
}



const HomeScreen = ({navigation}: {navigation: any}) => {
  return (
    <View>
      <ImageBackground source={image} resizeMode="cover" style={{position:'absolute',left:0, right:0,width: Dimensions.get('window').width,height:Dimensions.get('window').height}} >

      <Button
      title="Do not have an account, Create one today"
      onPress={() =>
        navigation.navigate('Register', {name: 'Jane'})
      }
    />
     <Text>Frist name</Text>
     <TextInput
        style={styles.input}
       
        placeholder="useless placeholder"
        keyboardType="default"
      />
      <Text>email</Text>
     <TextInput
        style={styles.input}
       
        placeholder="useless placeholder"
        keyboardType="default"
      />
      <Text>Password</Text>
     <TextInput
        style={styles.input}
       
        placeholder="useless placeholder"
        keyboardType="default"
      />
    </ImageBackground>
   

    </View>
    
  );
};

const ProfileScreen = () => {
  return <Login></Login>;
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{ headerStyle: { backgroundColor: '#967BB6' }  }}
      
      >
        

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerTitle: (props:any) => <LogoTitle2 {...props} />  }}
        />
        <Stack.Screen name="Register" component={()=>{return(<Login></Login>)}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },image: {
    flex: 1,
    justifyContent: 'center',
  },input: {
    height: 40,
    margin: 12,
    borderWidth: 0,
    padding: 10,
    backgroundColor:'rgba(211, 211, 211, 0.8)'
  },
});
