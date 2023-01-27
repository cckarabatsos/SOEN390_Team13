import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth } from "../firebaseConfig"

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');


  const handleSignUp = () => {
    /* auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials: any) => {
        const user = userCredentials.user;
        console.log(user.email);
      })
      .catch((error: any) => alert(error.message)) */


      
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>First name</Text>
      <TextInput
        value={firstName}
        onChangeText={setfirstname}
        placeholder="Enter your first name"
        style={styles.input}
      />
      <Text style={styles.label}>Last Name</Text>
      <TextInput
        value={lastname}
        onChangeText={setlastname}
        placeholder="Enter your last name"
        secureTextEntry={true}
        style={styles.input}
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        style={styles.input}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        style={styles.input}
      />
      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        value={confirmpassword}
        onChangeText={setconfirmpassword}
        placeholder="Please confirm your password"
        style={styles.input}
      />
      <TouchableOpacity onPress={handleSignUp} style={styles.button}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5'
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    width: '90%'
  },
  button: {
    backgroundColor: '#0077B5',
    padding: 12,
    width: '90%',
    alignItems: 'center',
    marginTop: 16
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});

export default Signup;