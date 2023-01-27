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
} from "react-native";
import { auth } from "../firebaseConfig";
import { ILoginUser } from "../Models/UsersModel";
import React from "react";
import { UserLogin } from "../api/LoginApi";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

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

  const handleLogIn = async () => {
    let aUser = new LoginUserModel(email, password);

    const userProfile = await UserLogin(aUser);

    if (userProfile) {
      
      navigation.navigate({
        name: "Home",
        params:{username : userProfile.name, user_email: userProfile.email, user_password:userProfile.password},
        merge: true,
      });
      
      
    } else {
      handleOpenModal();
    }

    /*      auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials: any) => {
        const user = userCredentials.user;
        console.log('signed in with:', user.email);
      })
      .catch((error: any) => alert(error.message)) */
  };

  return (
    <KeyboardAvoidingView>
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
        <Modal
          animationType="fade"
          transparent={true}
          visible={isVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalInnerContainer}>
              <Text style={styles.errorText}>Invalid username or password</Text>
              <TouchableOpacity
                onPress={handleCloseModal}
                style={styles.closeButtonContainer}
              >
                <MaterialCommunityIcons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Button
          title="Do not have an account, Create one today"
          onPress={() => navigation.navigate("Register")}
        />
        <KeyboardAvoidingView
          style={styles.emptyContainer}
        ></KeyboardAvoidingView>

        <KeyboardAvoidingView>
          <Text style={styles.label}>email</Text>
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
            placeholder="useless placeholder"
            keyboardType="default"
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry
            placeholder="useless placeholder"
            keyboardType="default"
          />

          <TouchableOpacity onPress={handleLogIn} style={styles.button}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
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
  emptyContainer: {
    height: Dimensions.get("window").height / 3,
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
    left: 85,
  },
  button: {
    margin: 9,
    marginLeft: 20,
    backgroundColor: "#0077B5",
    padding: 12,
    alignItems: "center",
    marginTop: 16,
    width: "60%",
    borderRadius: 120,
  },
  buttonText: {
    color: "#fff",
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
});
