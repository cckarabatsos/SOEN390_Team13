import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { PostUserApplication } from '../api/userApplicationsApi';
import Ionicons from "react-native-vector-icons/Ionicons";

type AddJobOfferModalProps = {
    ownerID: any;
    postingID: string;
    visible: boolean;
    onClose: () => void;
  };
  
const AddJobOfferModal: React.FC<AddJobOfferModalProps> = ({ ownerID, postingID, visible, onClose }) => {
    const [state, setState] = useState({
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
        address2: "",
        city: "",
        area: "",
        province: "",
        school: "",
        schoolCountry: "",
        schoolDegree: "",
        schoolEnd: "",
        schoolMajor: "",    
        attachResume: false,
        attachCoverLetter: false,
      });
    
      const handleInputChange = (value: string, field: string) => {
        setState((prevState) => ({ ...prevState, [field]: value }));
      };
    
      const handleSubmit = async () => {
        let timestamp = new Date().toLocaleString();
        let attachResume= false;
        let attachCoverLetter= false;
        let experience: string[]= [];
        
        await PostUserApplication(
            ownerID, 
            state.email, 
            state.firstName,
            state.lastName,
            state.phone,
            state.address,
            state.address2,
            state.city,
            state.area,
            state.province,
            state.school,
            state.schoolCountry,
            state.schoolDegree,
            state.schoolEnd,
            state.schoolMajor,
            timestamp,
            postingID,
            attachResume,
            attachCoverLetter,
            experience,
            );
        onClose();
      };


      const [emailError, setEmailError] = useState("");
      const [firstNameError, setFirstNameError] = useState("");
      const [lastNameError, setLastNameError] = useState("");
      const [phoneError, setPhoneError] = useState("");
      const [addressError, setAddressError] = useState("");
      const [cityError, setCityError] = useState("");
      const [provinceError, setProvinceError] = useState("");
    
      const validateForm = () => {
        let valid = true;
    
        if (state.email === "") {
          setEmailError("Email is required");
          valid = false;
        } else {
          setEmailError("");
        }
    
        if (state.firstName === "") {
          setFirstNameError("First name is required");
          valid = false;
        } else {
          setFirstNameError("");
        }
    
        if (state.lastName === "") {
          setLastNameError("Last name is required");
          valid = false;
        } else {
          setLastNameError("");
        }
    
        if (state.phone === "") {
          setPhoneError("Phone number is required");
          valid = false;
        } else {
          setPhoneError("");
        }
    
        if (state.address === "") {
          setAddressError("Address is required");
          valid = false;
        } else {
          setAddressError("");
        }
    
        if (state.city === "") {
          setCityError("City is required");
          valid = false;
        } else {
          setCityError("");
        }


        if (state.province  === "") {
            setProvinceError("Province is required");
            valid = false;
          } else {
            setProvinceError("");
          }
        
        return valid;
    }

  return (
    <Modal visible={visible} animationType="slide" transparent={true} >
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.modal}>
                <TouchableOpacity
                    style={styles.buttonModalClose}
                    onPress={onClose}
                >
                    <Ionicons size={30} name="close-outline" color={"red"} />
                </TouchableOpacity>
        <Text style={styles.title}>Application Form</Text>


    <View style={styles.containerInner}>
        <Text style={styles.title}>Personal Fields</Text>
        {emailError !== "" && (
              <Text style={styles.errorText}>{emailError}</Text>
            )}

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={state.email}
            placeholder="e.g. email@gmail.com"
            placeholderTextColor="#ccc"
            onChangeText={(value) => handleInputChange(value, 'email')}
          />
        </View>


        {firstNameError !== "" && (
              <Text style={styles.errorText}>{firstNameError}</Text>
            )}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={state.firstName}
            placeholder="e.g. John"
            placeholderTextColor="#ccc"
            onChangeText={(value) => handleInputChange(value, 'firstName')}
          />
        </View>


        {lastNameError !== "" && (
              <Text style={styles.errorText}>{lastNameError}</Text>
            )}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={state.lastName}
            placeholder="e.g. Doe"
            placeholderTextColor="#ccc"
            onChangeText={(value) => handleInputChange(value, 'lastName')}
          />
        </View>


        {phoneError !== "" && (
              <Text style={styles.errorText}>{phoneError}</Text>
            )}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={state.phone}
            placeholder="e.g. (123) 456-7890"
            placeholderTextColor="#ccc"
            onChangeText={(value) => handleInputChange(value, 'phone')}
          />
        </View>


        {addressError !== "" && (
              <Text style={styles.errorText}>{addressError}</Text>
            )}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            value={state.address}
            placeholder="e.g. 123 Main St."
            placeholderTextColor="#ccc"
            onChangeText={(value) => handleInputChange(value, 'address')}
          />
        </View>


        <View style={styles.inputContainer}>
          <Text style={styles.label}>Address 2</Text>
          <TextInput
            style={styles.input}
            value={state.address2}
            placeholder="e.g. Apt 4B"
            placeholderTextColor="#ccc"
            onChangeText={(value) => handleInputChange(value, 'address2')}
          />
        </View>


        {cityError !== "" && (
              <Text style={styles.errorText}>{cityError}</Text>
            )}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            value={state.city}
            placeholder="e.g. New York"
            placeholderTextColor="#ccc"
            onChangeText={(value) => handleInputChange(value, 'city')}
          />
        </View>


        <View style={styles.inputContainer}>
          <Text style={styles.label}>Area</Text>
          <TextInput
            style={styles.input}
            value={state.area}
            placeholder="e.g. Manhattan"
            placeholderTextColor="#ccc"
            onChangeText={(value) => handleInputChange(value, 'area')}
          />
        </View>


        {provinceError !== "" && (
              <Text style={styles.errorText}>{provinceError}</Text>
            )}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Province/State</Text>
          <TextInput
            style={styles.input}
            value={state.province}
            placeholder="e.g. NY"
            placeholderTextColor="#ccc"
            onChangeText={(value) => handleInputChange(value, 'province')}
          />
        </View>


        </View>
        <View style={styles.containerInner}>
            <Text style={styles.title}>Education Fields</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>School Name</Text>
          <TextInput
            style={styles.input}
            value={state.school}
            placeholder="e.g. Concordia University"
            placeholderTextColor="#ccc"
            onChangeText={(value) => handleInputChange(value, 'school')}
          />
        </View>


        <View style={styles.inputContainer}>
          <Text style={styles.label}>School City</Text>
          <TextInput
            style={styles.input}
            value={state.schoolCountry}
            placeholder="e.g. MTL"
            placeholderTextColor="#ccc"
            onChangeText={(value) => handleInputChange(value, 'schoolCountry')}
          />
        </View>


        <View style={styles.inputContainer}>
          <Text style={styles.label}>School Degree</Text>
          <TextInput
            style={styles.input}
            value={state.schoolDegree}
            placeholder="e.g. Bachelor of Engineering"
            placeholderTextColor="#ccc"
            onChangeText={(value) => handleInputChange(value, 'schoolDegree')}
          />
        </View>


        <View style={styles.inputContainer}>
          <Text style={styles.label}>School Completion Date</Text>
          <TextInput
            style={styles.input}
            value={state.schoolEnd}
            placeholder="e.g. 2022-01-01"
            placeholderTextColor="#ccc"
            onChangeText={(value) => handleInputChange(value, 'schoolEnd')}
          />
        </View>


        <View style={styles.inputContainer}>
          <Text style={styles.label}>School Major</Text>
          <TextInput
            style={styles.input}
            value={state.schoolMajor}
            placeholder="e.g. Software Engineering"
            placeholderTextColor="#ccc"
            onChangeText={(value) => handleInputChange(value, 'schoolMajor')}
          />
        </View>

        </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() =>{if(validateForm()){handleSubmit()}}}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
          <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
    </View>
    </ScrollView>
  </Modal>
  );
}

export default AddJobOfferModal;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      paddingVertical:50,
    },
    containerInner: {
        marginLeft: 20,
        paddingVertical: 20,
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
    errorText: {
        color: "red",
        marginTop: 5,
        fontSize: 12,
      }, 
    buttonModalClose: {
        alignItems: "flex-end",
        justifyContent: "flex-end",
    },
  });