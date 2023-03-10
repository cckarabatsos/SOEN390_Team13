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
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ContactsComponent(props:any) {
  const image = props.image || 'https://randomuser.me/api/portraits/men/1.jpg';

  const name = props.name;

  const job = props.job;

  const location = props.location;

  //console.log(image);

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
      <TouchableOpacity
            onPress={props.handleCloseModal}
            style={styles.closeButtonContainer}
          >
            <Ionicons name="person-remove-outline" size={25} color={"red"}></Ionicons>        
          </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    //backgroundColor: '#eeeeee',
    borderColor: "#f1f1f1",
    borderBottomWidth: 1,
    borderTopWidth: 2
  },
  column: {
    marginLeft:10,
    marginVertical:10
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 25,
    marginRight:10
    
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
  closeButtonContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 20,
    flex: 1,
    alignItems: 'flex-end'

  },
});
