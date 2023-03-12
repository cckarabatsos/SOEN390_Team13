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
import { GetApplicationsHistory } from "../api/userApplicationsApi";
import ApplicationComponent from "./ApplicationComponent";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ContactModal(props: {
  handleCloseModal: (() => void) | undefined;
  isVisible: boolean | undefined;
  screen: number;
  userID: string
}) 
{

const [userData, setUseData] = useState({});

const [users, setUsers] = useState([]);

const [currentEmail, setCurrentEmail] = useState("");

const getContactsList = async (userID:string) => {
  var responce = await GetApplicationsHistory(userID);
  setUsers(responce);
};

useEffect(() => {
    if (props.userID != null) {
        setCurrentEmail(props.userID);
        getContactsList(props.userID);
      } else {
        setUseData(false);
      }
    }, [props.userID]);

const handleLookUpProfile = () => {};

const renderContacts = ({item}:any) => (
    <ApplicationComponent
      //image={item.picture}
      company={item.company}
      type={item.type}
      description={item.description}
      location={item.location}
      duration={item.duration}
      salary={item.salary}
      currentEmail={currentEmail}
      companyEmail={item.email}
      postingID={item.postingID}
      jobPosterID={item.jobPosterID}
      userID={props.userID}
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
          <Text style={styles.contactsTitle}>Applications</Text>
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
        width: "90%",
        height: "90%",
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