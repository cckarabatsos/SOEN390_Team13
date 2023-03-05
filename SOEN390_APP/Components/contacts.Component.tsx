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

export default function ContactModal(props: {
  handleCloseModal: (() => void) | undefined;
  isVisible: boolean | undefined;
  screen: number;
  email: string
}) 
{

const [userData, setUseData] = useState({});

const [users, setUsers] = useState([]);

const [currentEmail, setCurrentEmail] = useState("");

const getContactsList = async (email:string) => {
  var responce = await GetContacts(email);
  console.log(responce);
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
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.contactsTitle}>Contacts</Text>
          <View style={styles.contactsContainer}>
            <FlatList
              data={users}
              renderItem={renderContacts}
              //keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.contactsList}
            />
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
        backgroundColor: "white",
        width: "80%",
        height: "80%",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
      },
      closeButtonContainer: {
        backgroundColor: "#f44336",
        padding: 10,
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
      },
      contactsContainer: {
        flex: 1,
        width: "100%",
      },
      contactsList: {
        paddingHorizontal: 20,
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