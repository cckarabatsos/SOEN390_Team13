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
import React, { Key, useState } from "react";
import Clipboard from "@react-native-clipboard/clipboard";
import { SwipeListView } from "react-native-swipe-list-view";
import PopUPForm from "../PopUPForm.Component";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RemoveUserSkills } from "../../api/UserSkillsAPI";
//import { auth } from '../firebaseConfig'

export default function Basic({ data }) {
  const { name, ownerID, skillID } = data;
  const [name1, setName] = useState(name);
  const [newName, setNewName] = useState("");
  const [input1, setInput1] = useState("");
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

  const editRow = (rowMap, rowKey) => {
    console.log("Edit Data");
    //setModalVisible(true);
  };

  const deleteSkill = (rowMap, rowKey) => {
    let responce = RemoveUserSkills(skillID);
    if (responce)
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Removed Skill",
      });

    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
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
      underlayColor={"#EEE"}
    >
      <View>
        <Text style={styles.text}>
          {input1} {name1}
        </Text>
      </View>
    </TouchableHighlight>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteSkill(rowMap, data.item.key)}
      >
        <Ionicons name="trash-sharp" size={30} color="white" />
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
    paddingVertical: 15,
    paddingHorizontal: 20,
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
    backgroundColor: "red",
    right: 50,
  },
  buttonModalClose: {
    position: "absolute",
    top: -35,
    right: -150,
    marginBottom: 5,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 20,
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
    height: "40%",
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
    height: 50,
    borderRadius: 120,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    margin: 10,
  },
});
