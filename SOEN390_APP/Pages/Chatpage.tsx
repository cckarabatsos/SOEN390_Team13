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

const ChatPage = ({ route, navigation }:any) => {
  const { chatData } = route.params;
  let name = chatData.name
  let image = require("../Components/Images/google-icon.png")
  const [messages, setMessages] = useState([
    { id: 1,sendByUser:true,  name: 'Cédric Michaud',text: ' salut bonjour?', image: image },
    { id: 2,sendByUser:false, name: name,text: name, image: image},
    { id: 3,sendByUser:false,name: 'lionel messi',text: '390 project', image: image }
  ]);
  const [input, setInput] = useState('');

  const goBack = () => {
    navigation.goBack();
  };

 const sendMessage = () => {
  setMessages([
    ...messages,
    { id: messages.length + 1, text: input, sendByUser: true, name: 'You', image: image },
    { id: messages.length + 2, text: 'Response message', sendByUser: false, name: 'Friend', image: image },
  ]);
  setInput('');
};
 
  const fileAttach = () => {
    const [text, setText] = useState('');

  }
  return (
    <View style={styles.container}>
           <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <Ionicons name="arrow-back-outline" size={28} color="#555" />
        </TouchableOpacity>
        <Image style={styles.profileImage} source={{ uri: chatData.image }} />
        <Text style={styles.name}>{chatData.name}</Text>
      </View>

<FlatList
  data={messages}
  renderItem={({ item }) => (
    <View style={[
      styles.messageBox,
      item.sendByUser ? styles.senderMessageBox : styles.receiverMessageBox,
    ]}>
      <Text style={item.sendByUser ? styles.senderMessageName : styles.receiverMessageName}>
        {item.sendByUser ? 'You' : item.name}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    marginLeft: 10,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },
});

export default ChatPage;


