import { useEffect, useState } from "react";
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
  FlatList
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GetContacts } from "../api/userContactsApi";
import ContactsComponent from "./ContactComponent";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ContactModal(props: {
  handleCloseModal: (() => void) | undefined;
  isVisible: boolean | undefined;
  screen: number;
  email: string
  navigation: any;
}) 
{

const [userData, setUseData] = useState({});

const [users, setUsers] = useState([]);

const [currentEmail, setCurrentEmail] = useState("");

const getContactsList = async (email:string) => {
  var responce = await GetContacts(email);
  setUsers(responce);
};

useEffect(() => {
    if (props.email != null) {
        setCurrentEmail(props.email);
        getContactsList(props.email);
      } else {
        setUseData(false);
      }
    }, [props.email]);

const handleLookUpProfile = () => {};

const renderContacts = ({item}:any) => (
    <ContactsComponent
      image={item.picture}
      name={item.name}
      job={item.currentPosition}
      location={item.location}
      currentEmail={currentEmail}
      contactEmail={item.email}
      navigation={props.navigation}
      handleCloseModal={props.handleCloseModal}
      refreshContacts={getContactsList}
    />
  );

return (
<Modal
      animationType="slide"
      transparent={true}
      visible={props.isVisible}
      onRequestClose={props.handleCloseModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalInnerContainer}>
          <TouchableOpacity
            onPress={props.handleCloseModal}
            style={styles.closeButtonContainer}
          >
            <Ionicons name="close-outline" size={25}></Ionicons>
          </TouchableOpacity>
          <Text style={styles.contactsTitle}>Contacts</Text>
          <View style={styles.contactsContainer}>
          <View style={styles.contactsListWrapper}>
            <FlatList
              data={users}
              renderItem={renderContacts}
              //keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.contactsList}
            />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        alignItems: "center",
        justifyContent: "center",
      },
      modalInnerContainer: {
        backgroundColor: "#f1f1f1",
        width: "80%",
        height: "80%",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom:20
      },
      closeButtonContainer: {
        backgroundColor: "#f44336",
        padding: 5,
        borderRadius: 20,
        position: "absolute",
        top: 20,
        right: 20,
        zIndex: 1,
      },
      closeButtonText: {
        color: "white",
        fontSize: 18,
      },
      contactsTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        padding: 20,
        alignItems: "flex-start"
      },
      contactsContainer: {
        flex: 1,
        width: "100%",
      },
      contactsListWrapper: {
        paddingVertical: 40,
        marginHorizontal: 10,
        borderRadius: 20,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
      },
      contactsList: {
        
      },
      contactCard: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: "white",
        marginBottom: 10,
      },
      contactImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 20,
      },
      contactInfo: {},
      contactName: {
        fontSize: 18,
        fontWeight: "bold",
      },
  })