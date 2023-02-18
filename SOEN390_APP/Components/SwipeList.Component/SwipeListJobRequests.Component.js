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
import { ScrollView } from "react-native-gesture-handler";

//import { auth } from '../firebaseConfig'

export default function Basic({ data }) {
  console.log(data);
  const {
    key,
    text,
    image,
    userID,
    message,
    loc,
    email,
    contract,
    category,
    position,
    salary,
  } = data;
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

  const acceptRequest = (rowMap, rowKey) => {
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: "ACCEPTED",
      textBody: "Job request accetped, sending notification to recruiter",
    });
    //ACCEPT IN BACKEND

    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const denyRequest = (rowMap, rowKey) => {
    console.log("Deny Request");
    //DENY IN BACKEND
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: "REFUSED",
      textBody: "Job request not accetped",
    });

    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const copyToClipBoard = () => {
    setModalVisible(true);
    //Clipboard.setString(text)
  };

  const messageRecruiter = () => {
    setModalVisible(false);
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
          <Text
            style={[styles.textSmall, styles.messageText]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {message.length > 50 ? message.substr(0, 50) + "..." : message}
          </Text>
          <Text>{loc}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => acceptRequest(rowMap, data.item.key)}
      >
        <Ionicons size={60} name="checkmark-outline" color={"green"} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        title={"toast notification"}
        onPress={() => denyRequest(rowMap, data.item.key)}
      >
        <Ionicons size={60} name="close-outline" color={"red"} />
      </TouchableOpacity>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View>
              <TouchableOpacity
                style={styles.buttonModalClose}
                onPress={() => setModalVisible(false)}
              >
                <Ionicons size={30} name="close-outline" color={"red"} />
              </TouchableOpacity>
            </View>
            <View style={styles.modalHeader}>
              <Image style={styles.logoModal} source={image} />
              <Text style={styles.modalHeaderText}>{position}</Text>
              <Text style={styles.modalBodyText}>{text}</Text>
              <Text style={styles.modalBodyTextMessage}>{loc}</Text>
            </View>
            <View style={styles.modalBody}>
              <Text style={styles.modalBodyText}>Email: {email}</Text>
            </View>
            <ScrollView style={styles.scrollview}>
              <Text style={styles.modalBodyText}>Job Description: </Text>

              <Text style={styles.modalBodyTextMessage}>{message}</Text>
            </ScrollView>
            <View style={styles.modalFooter}>
              <View style={styles.modalFooterColumn}>
                <Text style={styles.modalBodyText}>Salary</Text>
                <Text style={styles.modalBodyTextMessage}>{salary}</Text>
              </View>
              <View style={styles.modalFooterColumn}>
                <Text style={styles.modalBodyText}>Contract</Text>
                <Text style={styles.modalBodyTextMessage}>{contract}</Text>
              </View>
            </View>
            <View style={styles.modalFooterButton}>
              <TouchableOpacity
                style={styles.buttonModal}
                onPress={() => messageRecruiter()}
              >
                <Text style={styles.backTextWhite}>Message Recruiter</Text>
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
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    width: "95%",
    height: "80%",
    borderRadius: 10,
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
  buttonModalClose: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  buttonModal: {
    backgroundColor: "black",
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    width: "100%",
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
  logoModal: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginBottom: 20,
  },
  titleText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  textSmall: {
    fontSize: 12,
    color: "black",
  },
  textSmallRequest: {
    fontSize: 10,
    color: "black",
    overflow: "hidden",
    whitespace: "nowrap",
    textoverflow: "ellipsis",
    maxwidth: 20,
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalHeader: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalFooter: {
    position: "absolute",
    bottom: 80,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  modalFooterButton: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  modalHeaderText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  modalBody: {
    margin: 10,
  },
  modalBodyText: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  modalBodyMessage: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalFooterColumn: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  scrollview: {
    maxHeight: 160,
    overflowy: "scroll",
  },
});
