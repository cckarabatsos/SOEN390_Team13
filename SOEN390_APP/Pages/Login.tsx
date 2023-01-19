import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Button,
  Dimensions,
} from "react-native";

// fecth the backGround images from Image folder
const background_Image = require("../Components/Images/logInBackground.png");

//return the Login page elements
export default function Login({ navigation }: { navigation: any }) {
  return (
    <View>
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
          onPress={() => navigation.navigate("Register", { name: "Jane" })}
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 0,
    padding: 10,
    backgroundColor: "rgba(211, 211, 211, 0.8)",
  },
});
