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
} from "react-native";
import React, { Key, useState } from "react";
import { SwipeListView } from "react-native-swipe-list-view";
import { RemoveUserExperience } from "../../api/UserExperienceAPI.tsx";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
//import { auth } from '../firebaseConfig'

export default function Basic({ data }) {
  //console.log(data);
  const {
    experienceID,
    atPresent,
    company,
    ownerID,
    position,
    startDate,
    type,
    endDate,
    logo,
  } = data;
  const [name, setName] = useState(position);
  const [program, setProgram] = useState(company);
  const [experienceIDs, setExperienceIDs] = useState(experienceID);
  const [year, setYear] = useState(startDate);
  const [yearEnd, setYearEnd] = useState(endDate);
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

  const setDate = () => {
    if (atPresent) return year + " - Present";
    else return year + " - " + yearEnd;
  };

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const editRow = (rowMap, rowKey) => {
    console.log("Edit Data");
    setModalVisible(true);
  };

  const deleteRow = (rowMap, rowKey) => {
    let responce = RemoveUserExperience(experienceIDs);
    if (responce) {
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Removed Experience",
      });
      //ACCEPT IN BACKEND

      closeRow(rowMap, rowKey);
      const newData = [...listData];
      const prevIndex = listData.findIndex((item) => item.key === rowKey);
      newData.splice(prevIndex, 1);
      setListData(newData);
    }
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
      <View style={{ flexDirection: "row" }}>
        <Image style={styles.logo} source={{ uri: logo }} />
        <View>
          <Text style={styles.titleText}>{name}</Text>
          <Text style={styles.smallText}>{program}</Text>
          <Text style={styles.smallText}>{setDate()}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteRow(rowMap, data.item.key)}
      >
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder={"Enter new "}
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
    backgroundColor: "red",
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
  smallText: {
    fontSize: 14,
    color: "gray",
    marginLeft: 10,
  },
});
