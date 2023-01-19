import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
  TextInput,
  Dimensions,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Pages/Login";
import RegisterPage from "./Pages/Register";
import Icon from "react-native-vector-icons/Entypo";
import Signup from "./Pages/Register";
//constant Stack is use to set up the navigation between the different screen required in the application 
const Stack = createNativeStackNavigator();

// this function return the logo and the app name in the login screen
function LogoTitle() {
  return (
    <View style={styles.logoTitle}>
      <Icon name="log-out" size={50} color="black" />
      <Text style={{ fontSize: 30 }}> LinkedOut</Text>
    </View>
  );
}

/*
***** in the section below register all pages as const*******************************************
***** each subsequent const will return the specific page as a jsx element that is given to the component parameter of each stack.screen ie (component = {LoginScreen)************
*/


// return the Login page 
//param: navigation props used to navigate between Login page and register page
const LoginScreen = ({ navigation }: { navigation: any }) => {
  return <Login navigation={navigation}></Login>;
};

// return the Register page (not yet implemented)
//param: none
const RegisterScreen = () => {
  return <Signup></Signup>;
};

////return the whole app as a single jsx element, in here just add each page to its repective screen
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerStyle: { backgroundColor: "#967BB6" } }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerTitle: (props: any) => <LogoTitle {...props} /> }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


// styles for the app.tsx element 
//add css-like styles here
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logoTitle: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
});
