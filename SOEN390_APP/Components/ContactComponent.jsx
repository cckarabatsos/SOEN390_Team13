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
  FlatList,
  Image,
} from "react-native";

export default function ContactsComponent(props) {
  const image = props.image;

  const name = props.name;

  const job = props.job;

  const location = props.location;

  console.log(image);

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <Image style={styles.image} source={{ uri: image }} />
      </View>
      <View style={styles.column}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.job}>{job}</Text>
        <Text style={styles.location}>{location}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  column: {
    flex: 1,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  job: {
    fontSize: 14,
  },
  location: {
    fontSize: 14,
    color: "gray",
  },
});
