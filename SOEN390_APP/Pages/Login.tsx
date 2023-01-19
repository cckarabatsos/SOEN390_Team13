import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Button,
  Dimensions,
  TouchableOpacity
} from "react-native";

// fecth the backGround images from Image folder
const background_Image = require("../Components/Images/logInBackground.png");

//return the Login page elements
export default function Login({ navigation }: { navigation: any }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

  


    const handleLogIn = () => {
        // Make API call to sign up user with the email and password provided

        if(email == '12345' && password=="12345"){
            navigation.navigate("Home")
        }

      };


    
  return (
    <View >
      <ImageBackground
        source={background_Image}
        resizeMode="cover"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height,
        }}
      >
        <Button
          title="Do not have an account, Create one today"
          onPress={() => navigation.navigate("Register")}
        />
        <View style={styles.emptyContainer}>

        </View>
        
        <View>
        <Text style={styles.label}>email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholder="useless placeholder"
          keyboardType="default"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          placeholder="useless placeholder"
          keyboardType="default"
        />
        <TouchableOpacity onPress={handleLogIn}  style={styles.button}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>


        </View>
        
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer:{
    height:Dimensions.get('window').height/3

  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    margin: 9,
    marginLeft:20,
    borderWidth: 0,
    padding: 10,
    backgroundColor: "rgb(211, 211, 211)",
    width:'80%',
    borderRadius:20,
    height:50,
    fontSize:20,
  },label: {
    fontWeight: 'bold',
    marginBottom: 4,
    justifyContent:'center',
    alignItems:'center',
    fontSize:20,
    left:85
  },
  button: {
    margin: 9,
    marginLeft:20,
    backgroundColor: '#0077B5',
    padding: 12,
    alignItems: 'center',
    marginTop: 16,
    width:'60%',
    borderRadius:120
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize:20

  }
});
