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
  Image,
  Alert,
} from "react-native";
import React, { Key, useState } from "react";
import { SwipeListView } from "react-native-swipe-list-view";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import {
  AcceptInvitations,
  DeclineInvitations,
} from "../../api/UserRequestAPI";

//import { auth } from '../firebaseConfig'

export default function Basic({ data, email }) {
  //console.log(data);
  //console.log(email);
  const { key, text, image, userID, job, loc } = data;
  const [name, setName] = useState(text);
  const [modalVisible, setModalVisible] = useState(false);
  const [listData, setListData] = useState(
    Array(1)
      .fill("")
      .map((_, i) => ({ key: `${i}`, text: `item #${setName}` }))
  );
  const handleNameChange = (newName) => {
    setName(newName);
    // code to send new name to the database server
  };
  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const acceptRequest = (rowMap, rowKey, user_email, email) => {
    let responce = AcceptInvitations(email, user_email);
    if (responce)
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "ACCEPTED",
        textBody: "Friend request accetped",
      });
    //ACCEPT IN BACKEND

    closeRow(rowMap, rowKey, user_email, email);
    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const denyRequest = (rowMap, rowKey, user_email, email) => {
    let responce = DeclineInvitations(email, user_email);
    if (responce)
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "REFUSED",
        textBody: "Friend request not accetped",
      });
    //ACCEPT IN BACKEND

    closeRow(rowMap, rowKey, user_email, email);
    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const onRowDidOpen = (rowKey) => {
    //console.log("This row opened", rowKey);
  };

  const copyToClipBoard = () => {
    //setModalVisible(true);
    //Clipboard.setString(text)
  };

  const renderItem = (data) => (
    <TouchableHighlight
      onPress={copyToClipBoard}
      style={styles.rowFront}
      underlayColor={"#AAA"}
    >
      <View style={{ flexDirection: "row" }}>
        <Image style={styles.logo} source={image} />
        <View>
          <Text style={styles.titleText}>{name}</Text>
          <Text style={styles.smallText}>{job}</Text>
          <Text style={styles.smallText}>{loc}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => acceptRequest(rowMap, data.item.key, email, job)}
      >
        <Ionicons size={30} name="person-add-sharp" color={"green"} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        title={"toast notification"}
        onPress={() => denyRequest(rowMap, data.item.key, email, job)}
      >
        <Ionicons size={30} name="md-person-remove-sharp" color={"red"} />
      </TouchableOpacity>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder={"Enter new " + text}
              onChangeText={handleNameChange}
            />
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.buttonModal}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.backTextWhite}>Submit</Text>
              </TouchableOpacity>
            </View>
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
        rightOpenValue={-150}
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
    backgroundColor: "white",
    flex: 1,
  },
  backTextWhite: {
    color: "#FFF",
  },
  rowFront: {
    backgroundColor: "white",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    justifyContent: "center",
    height: 80,
    paddingStart: 20,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
    borderRadius: 40,
  },
  backRightBtnLeft: {
    backgroundColor: "#fff",
    right: 75,
    borderColor: "green",
    borderWidth: 2,
  },
  backRightBtnRight: {
    backgroundColor: "#fff",
    right: 0,
    borderColor: "red",
    borderWidth: 2,
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    width: "80%",
    height: "30%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    margin: 9,
    marginLeft: 20,
    backgroundColor: "#0077B5",
    padding: 12,
    alignItems: "center",
    marginTop: 16,
    width: 200,
    height: 80,
    borderRadius: 120,
  },
  buttonModal: {
    margin: 9,
    marginLeft: 20,
    backgroundColor: "#0077B5",
    padding: 12,
    alignItems: "center",
    marginTop: 16,
    width: 200,
    height: 50,
    borderRadius: 120,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    margin: 10,
  },
  logo: {
    paddingLeft: 20,
    alignSelf: "flex-start",
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  titleText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  textSmall: {
    fontSize: 10,
    color: "black",
  },
});
