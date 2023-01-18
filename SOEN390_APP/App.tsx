import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from './Pages/Login';
import Icon from 'react-native-vector-icons/Entypo';


const Stack = createNativeStackNavigator();


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
    <Button
      title="Do not have an account, Create one today"
      onPress={() =>
        navigation.navigate('Register', {name: 'Jane'})
      }
    />
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
          options={{headerTitle: (props:any) => <LogoTitle2 {...props} /> }}
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
  },
});
