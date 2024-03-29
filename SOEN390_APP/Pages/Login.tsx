import { useEffect, useState,useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Button,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Modal,
  Image
} from "react-native";
import { auth } from "../firebaseConfig";
import { ILoginUser } from "../Models/UsersModel";
import React from "react";
import { UserLogin } from "../api/LoginApi";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import ErrorModal from "../Components/ErrorModal";

// fecth the backGround images from Image folder
const background_Image = require("../Components/Images/logInBackground.png");

class LoginUserModel implements ILoginUser {
  email: string;
  password: string;
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}



//return the Login page elements
export default function Login({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isVisible, setIsVisible] = useState(false);
  

  const handleOpenModal = () => {
    setIsVisible(true);
  };

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  /*     useEffect(() => {
      const unsubscribe = auth.onAuthStateChange((user: any) => {
        if(user){
          navigation.navigate("Home")
        }
      })
      return unsubscribe
    }, []) */

    const handleGoogleLogIn = () => {

    }

    const handleSignUp = () => {

    }

  const handleLogIn = async () => {
    let aUser = new LoginUserModel(email, password);

    const userProfile = await UserLogin(aUser);
    
    if (userProfile) {
      
      navigation.navigate({
        name: "Home",
        params:{username : userProfile.name, user_email: userProfile.email, user_password:userProfile.password, userID:userProfile.userID, pendingInvitations: userProfile.pendingInvitations},
        merge: true,
      });
      
      
    } else {
      handleOpenModal();
    }
  };

  return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
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
        <ErrorModal
          isVisible={isVisible}
          handleCloseModal={handleCloseModal}
          screen={1}
        ></ErrorModal>

        <Button
          title="Do not have an account, Create one today"
          onPress={() => navigation.navigate("Register")}
        />
        <View
          style={styles.emptyContainer}
        ></View>

        <View style={styles.containerOuter}>
          <Text style={styles.label}>Email: </Text>
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
            placeholder="Enter Email"
            keyboardType="default"
          />
          <Text style={styles.label}>Password: </Text>
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry
            placeholder="Enter Password"
            keyboardType="default"
          />
          </View>
          <View style={styles.containerLower}>
          
        </View>
        
        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={handleSignUp} style={styles.button}>
            <Text 
            style={styles.buttonText}
            onPress={() => navigation.navigate("Register")}
            >Sign Up</Text>
          </TouchableOpacity>
          <Text>       </Text>
          <TouchableOpacity onPress={handleLogIn} style={styles.button}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
        </View>

      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  containerOuter: {
    width: "65%",
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  containerLower: {
    justifyContent: 'center',
    width: "65%",
    alignItems: 'center',
  },
  emptyContainer: {
    height: Dimensions.get("window").height / 4,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    margin: 9,
    marginLeft: 20,
    borderWidth: 0,
    padding: 10,
    backgroundColor: "rgb(211, 211, 211)",
    width: "80%",
    borderRadius: 20,
    height: 50,
    fontSize: 20,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
    marginLeft: 20
  },
  button: {
    backgroundColor: '#d4d4d4',
    padding: 12,
    width: '35%',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    borderRadius: 30,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalInnerContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    fontSize: 28,
    marginBottom: 10,
    marginTop: 40,
    color: "slategrey",
  },
  closeButtonContainer: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 20,
    position: "absolute",
    top: -10,
    right: -10,
  },
  buttonGoogle: {
    flexDirection: 'row',
    backgroundColor: '#d4d4d4',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    borderRadius: 30,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    marginTop: 16,
    borderRadius: 30,
    gap: 100,
  },
  logo: {
    paddingLeft: 20,
    alignSelf: 'flex-start',
    width: 30,
    height: 30,
    borderRadius: 50
  },
});
