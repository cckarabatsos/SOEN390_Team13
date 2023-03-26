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
import { removeNotification } from "../../api/NotificationAPI";

//import { auth } from '../firebaseConfig'

export default function Basic({ data }) {
  const {
    key,
    category,
    logo,
    message,
    notificationID,
    ownerID,
    relatedEntity,
    timestamp,
  } = data;
  const [name, setName] = useState(category);
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

  const denyRequest = async (rowMap, rowKey, notificationID1) => {
    console.log(notificationID1);
    let responce = await removeNotification(notificationID1);
    if (responce) {
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
    }
  };

  const copyToClipBoard = () => {
    //Clipboard.setString(text)
  };

  const messageRecruiter = () => {
    //Clipboard.setString(text)
  };

  const renderItem = (data) => (
    <TouchableHighlight
      onPress={copyToClipBoard}
      style={styles.rowFront}
      underlayColor={"#AAA"}
    >
      <View style={{ flexDirection: "row" }}>
        <Image style={styles.logo} source={logo} />
        <View>
          <Text style={styles.titleText}>{category}</Text>
          <Text
            style={[styles.textSmall, styles.messageText]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {message.length > 50 ? message.substr(0, 50) + "..." : message}
          </Text>
          <Text>{timestamp}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        title={"toast notification"}
        onPress={() => denyRequest(rowMap, data.item.key, notificationID)}
      >
        <Ionicons size={30} name="trash-outline" color={"red"} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={0}
        rightOpenValue={-75}
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
    borderWidth: 1,
    justifyContent: "center",
    height: 80,
    paddingStart: 20,
    borderRadius: 20,
    marginHorizontal: 10,
    marginVertical: 4,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 20,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    height: 50,
    width: 50,
    borderRadius: 40,
    marginTop: 15,
  },
  backRightBtnLeft: {
    //backgroundColor: "#fff",
    right: 75,
    //borderColor: "green",
    //borderWidth: 2,
  },
  backRightBtnRight: {
    backgroundColor: "#fff",
    right: 0,
    //borderColor: "red",
    //borderWidth: 2,
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
    marginRight: 15,
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
