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

//import { auth } from '../firebaseConfig'

export default function Basic({ data }) {
  console.log(data);
  const { key, text } = data;
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

  const editRow = (rowMap, rowKey) => {
    console.log("Edit Data");
    setModalVisible(true);
    console.log(text);
  };

  const deleteRow = (rowMap, rowKey) => {
    console.log("delete Data");
  };

  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };

  const copyToClipBoard = () => {
    console.log("Copied To Clipboard");
    //Clipboard.setString(text)}
  };

  const renderItem = (data) => (
    <TouchableHighlight
      onPress={copyToClipBoard}
      style={styles.rowFront}
      underlayColor={"#AAA"}
    >
      <View>
        <Text>{name}</Text>
      </View>
    </TouchableHighlight>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <Text></Text>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => editRow(rowMap, data.item.key)}
      >
        <Text style={styles.backTextWhite}>Edit</Text>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder={"Enter new " + text}
              onChangeText={handleNameChange}
            />
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.button}
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
        rightOpenValue={-75}
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
  },
  backTextWhite: {
    color: "#FFF",
  },
  rowFront: {
    alignItems: "center",
    backgroundColor: "white",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    justifyContent: "center",
    height: 50,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#DDD",
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
  },
  backRightBtnLeft: {
    backgroundColor: "blue",
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: "blue",
    right: 0,
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
