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
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ErrorModal(props: {
  handleCloseModal: (() => void) | undefined;
  isVisible: boolean | undefined;
  screen: number;
}) {
  const errorText =
    props.screen == 1
      ? "Invalid username or password"
      : "Please ensure that all the fields are filled out correctly and that passwords match";
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.isVisible}
      onRequestClose={props.handleCloseModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalInnerContainer}>
          <Text style={styles.errorText}>{errorText}</Text>
          <TouchableOpacity
            onPress={props.handleCloseModal}
            style={styles.closeButtonContainer}
          >
            <MaterialCommunityIcons name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalInnerContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    fontSize: 28,
    marginBottom: 10,
    marginTop: 40,
    color: "slategrey",
  },
  closeButtonContainer: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 20,
    position: "absolute",
    top: -10,
    right: -10,
  },
});
