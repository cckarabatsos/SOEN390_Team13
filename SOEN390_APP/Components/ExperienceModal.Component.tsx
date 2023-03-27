import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { PostUserExperience } from '../api/UserExperienceAPI';

type AddExperienceModalProps = {
  type: string;
  ownerID: string;
  visible: boolean;
  onClose: () => void;
}

const AddExperienceModal: React.FC<AddExperienceModalProps> = ({ ownerID, type, visible, onClose }) => {
  const [atPresent, setAtPresent] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [position, setPosition] = useState<string>("");

  let expereinceType = type
  console.log(type)
  if(type==="Work")
    expereinceType="Experience"

  const handleInputChange = (value: string, field: string) => {
    switch(field) {
      case 'atPresent':
        setAtPresent(value === 'true');
        break;
      case 'startDate':
        setStartDate(value);
        break;
      case 'endDate':
        setEndDate(value);
        break;
      case 'company':
        setCompany(value);
        break;
      case 'position':
        setPosition(value);
        break;
      default:
        break;
    }
  }

  const handleSubmit = async () => {
    await PostUserExperience(ownerID, type, atPresent, startDate, endDate, company, position);
    onClose();
  }

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
    <View style={styles.container}>
    <View style={styles.modal}>
      <Text style={styles.title}>Add {expereinceType}</Text>
      <View style={styles.inputContainer}>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Currently Working Here?</Text>
        <TouchableOpacity style={styles.checkboxContainer} onPress={() => setAtPresent(!atPresent)}>
          <View style={[styles.checkbox, atPresent && styles.checkboxSelected]} />
          <Text style={styles.checkboxLabel}>{atPresent ? 'Yes' : 'No'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Start Date</Text>
        <TextInput style={styles.input} value={startDate} placeholder="e.g. 2020-01-01" placeholderTextColor="#ccc"onChangeText={(value) => handleInputChange(value, 'startDate')} />
      </View>
      {!atPresent && (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>End Date</Text>
          <TextInput style={styles.input} value={endDate} onChangeText={(value) => handleInputChange(value, 'endDate')} placeholder="e.g. 2022-01-01"
            placeholderTextColor="#ccc"/>
        </View>
      )}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Company</Text>
        <TextInput style={styles.input} value={company} onChangeText={(value) => handleInputChange(value, 'company')} placeholder="e.g. Microsoft"
            placeholderTextColor="#ccc"/>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Position</Text>
        <TextInput style={styles.input} value={position} onChangeText={(value) => handleInputChange(value, 'position')} placeholder="e.g. Senrio Software Engineer"
            placeholderTextColor="#ccc"/>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
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

export default AddExperienceModal;

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
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    checkbox: {
      width: 20,
      height: 20,
      borderRadius: 4,
      borderWidth: 2,
      borderColor: '#ccc',
      marginRight: 8,
    },
    checkboxSelected: {
      backgroundColor: '#333',
      borderColor: '#333',
    },
    checkboxLabel: {
      fontSize: 16,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 16,
    },
    button: {
      backgroundColor: '#333',
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 4,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
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
  