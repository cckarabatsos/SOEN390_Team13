import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import { auth } from "../firebaseConfig";
import { UserSignUp } from "../api/SignUpApi";
import { ISignUpUser } from "../Models/UsersModel";
import ErrorModal from "../Components/ErrorModal";

class SignUpUserModel implements ISignUpUser {
  email: string;
  password: string;
  name: string;
  constructor(email: string, password: string, name: string) {
    this.email = email;
    this.password = password;
    this.name = name;
  }
}

const background_Image = require("../Components/Images/registerBackground.png");

const Signup = ({ navigation, route }: { navigation: any; route: any }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");

  const handleSignUp = async () => {
    if (password == confirmpassword) {
      let aUser: ISignUpUser = new SignUpUserModel(
        email,
        password,
        firstName + " " + lastname
      );
      const validUser = await UserSignUp(aUser);
      console.log("hello")
      console.log(validUser.registeredUser[0]);

      if (validUser.registeredUser[0]!=401) {
        navigation.navigate("Home", {
          named: "Welcome " + validUser.name + "!",
        });
      } else {
        handleOpenModal();
      }
    } else {
      handleOpenModal();
    }
  };

  const handleGoogleSignUp = () => {};

  const [isVisible, setIsVisible] = useState(false);

  const handleOpenModal = () => {
    setIsVisible(true);
  };

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  return (
    <View style={styles.container}>
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
          screen={2}
        ></ErrorModal>

        <View style={styles.containerSubmit}>
          <Text style={styles.labelTitle}>Welcome Onboard!</Text>
          <View style={styles.containerOuter}>
            <Text style={styles.label}>Name:</Text>
            <TextInput
              value={firstName}
              onChangeText={setfirstname}
              placeholder="Enter your first name"
              style={styles.input}
            />

            <Text style={styles.label}>Email:</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              style={styles.input}
            />
            <Text style={styles.label}>Password:</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              style={styles.input}
            />
            <Text style={styles.label}>Confirm Password:</Text>
            <TextInput
              value={confirmpassword}
              onChangeText={setconfirmpassword}
              placeholder="Please confirm your password"
              style={styles.input}
            />
          </View>
          <TouchableOpacity
            onPress={handleGoogleSignUp}
            style={styles.buttonGoogle}
          >
            <Image
              style={styles.logo}
              source={require("../Components/Images/google-icon.png")}
            />
            <Text style={styles.buttonText}> Sign up with Google</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerLower}>
          <TouchableOpacity onPress={handleSignUp} style={styles.button}>
            <Text style={styles.buttonTextLower}>Register Now</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  containerSubmit: {
    flex: 1,
    justifyContent: "center",
    width: "65%",
    marginLeft: 5,
  },
  containerOuter: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  containerLower: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "20%",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 8,
    marginLeft: 20,
  },
  labelTitle: {
    fontWeight: "bold",
    marginBottom: 8,
    marginLeft: 20,
    fontSize: 25,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 16,
    width: "90%",
    borderRadius: 30,
    backgroundColor: "#d4d4d4",
  },
  button: {
    backgroundColor: "#d4d4d4",
    padding: 12,
    width: "70%",
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    borderRadius: 30,
  },
  buttonGoogle: {
    flexDirection: "row",
    backgroundColor: "#d4d4d4",
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    borderRadius: 30,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
  },
  buttonTextLower: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
  },
  logo: {
    paddingLeft: 20,
    alignSelf: "flex-start",
    width: 30,
    height: 30,
    borderRadius: 50,
  },
});

export default Signup;
