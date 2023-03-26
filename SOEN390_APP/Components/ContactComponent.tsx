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
import { CreateConversation } from "../api/MessagesAPI";
import { useNavigation } from '@react-navigation/native';
import { RemoveContact } from "../api/userContactsApi";


interface ContactsComponentProps {
  image: string;
  name: string;
  job: string;
  location: string;
  currentEmail: string;
  contactEmail: string;
  navigation: any;
  handleCloseModal: (() => void) | undefined;
  refreshContacts: (email: string) => Promise<void>;
}



export default function ContactsComponent(props: ContactsComponentProps) {


  const image = props.image || 'https://randomuser.me/api/portraits/men/1.jpg';

  const name = props.name;

  const job = props.job;

  const location = props.location;

  const currentEmail = props.currentEmail
  const contactEmail = props.contactEmail
  

  //console.log(image);

  const handleSendMessageRequest = async (emailUser:string, emailContact:string)=>{
    await CreateConversation(emailUser, emailContact);
    props.navigation.navigate('Messages');
    props.handleCloseModal && props.handleCloseModal(); // close the modal
    
  }
  const handleRemoveFriend = async(emailSender: string, emailReceiver: string )=>{
    const responce = await RemoveContact(emailSender,emailReceiver)
    if(responce){
      props.refreshContacts(emailSender);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <Image style={styles.image} source={{ uri: image }} />
      </View>
      <View style={styles.column}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.job}>{job}</Text>
        <Text style={styles.location}>{contactEmail}</Text>
      </View>
            <TouchableOpacity
              onPress={() => handleSendMessageRequest(currentEmail,contactEmail)}
              style={styles.closeButtonMessageContainer}
            >
              <Ionicons name="chatbubble-outline" size={25} color={"green"}></Ionicons>        
            </TouchableOpacity>
        <TouchableOpacity
            onPress={() => handleRemoveFriend(currentEmail,contactEmail)}
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
    flex: 1,
    alignItems: 'flex-end',

  },
  closeButtonMessageContainer: {
    flex: 1,
    alignItems: 'flex-end',  

  },
});
