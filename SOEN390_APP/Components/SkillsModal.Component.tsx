import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { PostUserSkills } from '../api/UserSkillsAPI';

type AddSkillsProps = {
  ownerID: string;
  visible: boolean;
  onClose: () => void;
}

const AddSkillsModal: React.FC<AddSkillsProps> = ({ ownerID, visible, onClose }) => {
  const [name, setName] = useState<string>("");

  const handleInputChange = (value:string) => {
    setName(value);
  };

  const handleSubmit = async () => {
    await PostUserSkills(ownerID, name);
    onClose();
  }

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
    <View style={styles.container}>
      <View style={styles.modal}>
        <Text style={styles.title}>Add Skills</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={handleInputChange}
            placeholder="e.g. JavaScript"
            placeholderTextColor="#ccc"
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
            <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
  );
}

export default AddSkillsModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modal: {
        backgroundColor: '#fff',
        width: '80%',
        borderRadius: 8,
        padding: 16,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
      },
      inputContainer: {
        marginBottom: 16,
      },
      label: {
        fontSize: 16,
        marginBottom: 8,
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
        fontSize: 16,
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
      },
      button: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      },
      submitButton: {
        backgroundColor: '#333',
        marginRight: 8,
      },
      cancelButton: {
        backgroundColor: '#ccc',
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
      cancelButtonText: {
        color: '#333',
      },
  });