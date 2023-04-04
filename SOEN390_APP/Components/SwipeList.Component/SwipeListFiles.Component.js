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
import { GetFile } from "../../api/UserFileAPI";
//import RNFetchBlob from "rn-fetch-blob";

//import { auth } from '../firebaseConfig'

export default function Files({ data }) {
  const { key, input, userID } = data;
  const [name, setName] = useState();
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
  const [resume, setResume] = React.useState();
  const [coverletter, setCoverletter] = React.useState();
  const [coverletterFilename, setCoverletterFilename] = React.useState();
  const [resumeFilename, setResumeFilename] = React.useState();

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

  const uploadFile = (rowMap, rowKey) => {
    //setModalVisible(true);
  };

  const downloadFile = async (input) => {
    if (input === "Cover Letter") {
      let UserCoverLetter = "";
      const getCoverLetter = async () => {
        UserCoverLetter = await GetFile(user.userID, "coverletter");
        return UserCoverLetter;
      };

      if (UserCoverLetter !== null) {
        getCoverLetter().then((coverLetter) => {
          setCoverletter(coverLetter);
          const url = coverLetter;
          setCoverletterFilename(
            decodeURIComponent(url.split("/").pop().split("?")[0]).split(
              " - "
            )[1]
          );
        });
        console.log(coverletterFilename);
      }
    } else if (input === "Resume") {
      let UserResume = "";
      const getResume = async () => {
        UserResume = await GetFile(user.userID, "resume");
        return UserResume;
      };

      if (UserResume !== null) {
        getResume().then((resume) => {
          setResume(resume);
          const url = resume;
          setResumeFilename(
            decodeURIComponent(url.split("/").pop().split("?")[0]).split(
              " - "
            )[1]
          );
          console.log(
            decodeURIComponent(url.split("/").pop().split("?")[0]).split(
              " - "
            )[1]
          );
          console.log("resume:", resume);
        });
      }
    }
  };

  const handleEditUserProfile = async (emailOld, user) => {};

  const handleSubmit = async () => {
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

  const onRowDidOpen = (rowKey) => {};

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
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons size={25} name="document-outline" />
          <Text style={styles.textBold}>{input1}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => uploadFile(rowMap, data.item.key)}
      >
        <Ionicons size={30} name="cloud-upload-outline" color={"white"} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => downloadFile(input)}
      >
        <Ionicons size={30} name="download-outline" color={"white"} />
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
            <Text style={styles.textBold}>{input1}</Text>
            <TextInput
              style={styles.input}
              placeholder={"Enter new " + input1}
              onChangeText={handleNameChange}
            />
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleSubmit()}
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
        rightOpenValue={-105}
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
    height: 60,
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
    backgroundColor: "orange",
    right: 75,
  },
  buttonModalClose: {
    position: "absolute",
    top: -35,
    right: -150,
    marginBottom: 5,
  },
  backRightBtnRight: {
    backgroundColor: "blue",
    right: 25,
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
  textBold: {
    color: "#333",
    fontSize: 18,
    fontWeight: "500",
  },
});
