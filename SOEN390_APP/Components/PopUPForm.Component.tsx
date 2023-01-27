import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const PopUPForm = (text: any) => {
  const [name, setName] = useState(text);
  const [modalVisible, setModalVisible] = useState(false);

  const handleNameChange = (newName: any) => {
    setName(newName);
    // code to send new name to the database server
  }

  return (
    <View style={styles.container}>
      <Text>Your name: {name}</Text>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text>Edit</Text>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <TextInput
            placeholder="Enter new name"
            onChangeText={handleNameChange}
          />
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PopUPForm;