import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  FlatList,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';

const ChatPage = ({route}:{route:any}) => {
  const { chatData } = route.params;
  let name = chatData.name
  let image = require("../Components/Images/google-icon.png")
  const [messages, setMessages] = useState([
    { id: 1,sendByUser:true,  name: 'Cédric Michaud',text: ' salut bonjour?' },
    { id: 2,sendByUser:false, name: name,text: name },
    { id: 3,sendByUser:false,name: 'lionel messi',text: '390 project' }
  ]);
  const [input, setInput] = useState('');

 const sendMessage = () => {
  setMessages([
    ...messages,
    { id: messages.length + 1, text: input, sentByUser: true, senderName: 'You' },
    { id: messages.length + 2, text: 'Response message', sentByUser: false, senderName: 'Friend' },
  ]);
  setInput('');
};
 
  const fileAttach = () => {
    const [text, setText] = useState('');

  }
  return (
    <View style={styles.container}>
     

<FlatList
  data={messages}
  renderItem={({ item }) => (
    <View style={[
      styles.messageBox,
      item.sentByUser ? styles.senderMessageBox : styles.receiverMessageBox,
    ]}>
      <Text style={item.sentByUser ? styles.senderMessageName : styles.receiverMessageName}>
        {item.sentByUser ? 'You' : item.senderName}
      </Text>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
    
  )}
/>

      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={text => setInput(text)}
          placeholder='Type a message...'
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.fileButton} onPress={fileAttach}>
          <Ionicons name="attach" size={24} color="black" />
        </TouchableOpacity>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  messageBox: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 5
  },
  senderMessageBox: {
    alignSelf: 'flex-end',
    backgroundColor: '#c3e8ff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
    maxWidth: '80%',
  },
  receiverMessageBox: {
    alignSelf: 'flex-start',
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
    maxWidth: '80%',
  },
  senderMessageName: {
    color: '#0099ff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  receiverMessageName: {
    color: '#555',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  messageText: {
    fontSize: 16
  },
  inputBox: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff'
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 5
  },
  sendButton: {
    padding: 10,
    backgroundColor: '#0084ff',
    borderRadius: 5,
    marginLeft: 10
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
    fileButton: {
    padding: 8,
    marginRight: 8,
  },
});

export default ChatPage;


