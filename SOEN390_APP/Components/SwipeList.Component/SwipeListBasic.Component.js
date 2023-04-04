import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Button,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  KeyboardAvoidingView,
  Modal,
} from "react-native";
import { useEffect } from "react";
import React, { Key, useState } from "react";
import Clipboard from "@react-native-clipboard/clipboard";
import { SwipeListView } from "react-native-swipe-list-view";
import PopUPForm from "../PopUPForm.Component";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import Ionicons from "react-native-vector-icons/Ionicons";
import { GetUserInfo } from "../../api/GetUsersAPI";
import { editUserProfile } from "../../api/UserProfileAPI";

//import { auth } from '../firebaseConfig'

export default function Basic({ data }) {
  const { key, text, input, userID } = data;
  const [name, setName] = useState(text);
  const [newName, setNewName] = useState("");
  const [user, setUser] = useState({});
  const [input1, setInput1] = useState(input);
  const [userUpdated, setUserUpdated] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [listData, setListData] = useState(
    Array(1)
      .fill("")
      .map((_, i) => ({ key: `${i}`, text: `item #${setName}` }))
  );

  const handleNameChange = (newName) => {
    setNewName(newName);
    // code to send new name to the database server
  };

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const handleGetUser = async () => {
    const user1 = await GetUserInfo(userID);
    setUser(user1);
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  const editRow = (rowMap, rowKey) => {
    setModalVisible(true);
  };

  const handleEditUserProfile = async (emailOld, user) => {
    await editUserProfile(emailOld, user);
  };

  const handleSubmit = async () => {
    console.log(input1);
    const emailOld = user.email;
    let updatedUser = {};
    if (input1 === "Name")
      updatedUser = { ...user, name: newName }; // update the name attribute
    else if (input1 === "Bio") updatedUser = { ...user, bio: newName };
    else if (input1 == "Password") updatedUser = { ...user, password: newName };
    else if (input1 == "Current Company")
      updatedUser = { ...user, currentCompany: newName };
    else if (input1 == "Current Position")
      updatedUser = { ...user, currentPosition: newName };

    await handleEditUserProfile(emailOld, updatedUser);

    //setModalVisible(false);
    if (newName !== "") {
      setName(newName);
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        textBody: input1 + " changed",
      });
    }
    setUserUpdated(true);
    setModalVisible(false);
  };

  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };

  const copyToClipBoard = () => {
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      textBody: "Copied To Clipboard",
    });
    //Clipboard.setString(text)}
  };

  const renderItem = (data) => (
    <TouchableHighlight
      onPress={copyToClipBoard}
      style={styles.rowFront}
      underlayColor={"#AAA"}
    >
      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={styles.text}>{input1}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => editRow(rowMap, data.item.key)}
      >
        <Ionicons size={25} name="create-outline" color={"white"} />
      </TouchableOpacity>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.buttonModalClose}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons size={30} name="close-outline" color={"red"} />
            </TouchableOpacity>
            <Text style={styles.textBold}>{input1}</Text>
            <TextInput
              style={styles.input}
              placeholder={"Enter new " + input1}
              onChangeText={handleNameChange}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSubmit()}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );

  return (
    <View style={styles.container}>
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={0}
        rightOpenValue={-50}
        previewRowKey={"0"}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onRowDidOpen={onRowDidOpen}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  rowFront: {
    backgroundColor: "white",
    borderRadius: 20,
    marginVertical: 5,
    shadowColor: "#000",
    height: 50,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 1,
    elevation: 3,
    marginHorizontal: 20,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginBottom: 2,
  },
  backText: {
    color: "#FFF",
    fontSize: 16,
  },
  text: {
    color: "#333",
    fontSize: 18,
    fontWeight: "500",
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 10,
    width: 45,
    height: 45,
    borderRadius: 25,
  },
  backRightBtnLeft: {
    backgroundColor: "blue",
    right: 50,
  },
  buttonModalClose: {
    position: "absolute",
    top: -35,
    right: -150,
    marginBottom: 5,
  },
  backRightBtnRight: {
    backgroundColor: "blue",
    right: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    maxWidth: 400,
  },
  buttonModalClose: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  textBold: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    width: "100%",
  },
  button: {
    backgroundColor: "#0077B5",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "500",
  },
});
