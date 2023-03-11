import React, { useState, useEffect } from "react";
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
import { GetAllMessages } from "../api/MessagesAPI";
import { SendMessage } from "../api/MessagesAPI";
import { GetUserInfo } from "../api/GetUsersAPI";
type MessageType = {
  id: number,
  text: string,
  sendByUser: boolean,
  name: string,
  image: string,
};

const ChatPage = ({ route, navigation }:any) => {
  const { chatData } = route.params;
  let name = chatData.name
  let image = require("../Components/Images/google-icon.png")
  let emailUser = chatData.emailUser
  let emailContact = chatData.email
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [allMessages, setAllMessages] = useState([]);
  const [input, setInput] = useState('');

  const goBack = () => {
    navigation.goBack();
  };

  //{ id: 3,sendByUser:false,name: 'lionel messi',text: '390 project', image: image }

  const handleGetMessages = async () => {
    const message = await GetAllMessages(emailUser, emailContact);

    const newObjectsArray = await Promise.all(message.map(buildObject));
    setMessages(newObjectsArray);
  }
  const { v4: uuidv4 } = require('uuid');

  useEffect(() => {
    handleGetMessages();
  }, [input]);

  //const { v4: uuidv4 } = require('uuid');
const handleGetUserInfo = async(userID:string) =>{
  const userInfo = await GetUserInfo(userID)
  //console.log(userInfo)
  return userInfo
}

  const buildObject = async (jsonObject:any) => {
    const { email, message } = jsonObject;
    const user = await handleGetUserInfo(message.senderId)
    const obj = {
      id: uuidv4(),
      text: message.content,
      name: user.name,
      image: user.picture|| 'https://randomuser.me/api/portraits/men/1.jpg',
      sendByUser: handleIsSentByUser(user.name)
    }
    //console.log(obj)
    return obj;
  }

  const handleIsSentByUser = (userName:string) =>{
    //console.log(userName, name)
    if(userName==="test test")
      return true
    else return false
  }



const handleSendMessage = async (message:string) => {
  await SendMessage(emailUser,emailContact, message)
  setInput('')
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
    <View>
      <View style={[
        styles.messageBox,
        item.sendByUser ? styles.senderMessageBox : styles.receiverMessageBox,
      ]}>
        <Image style={styles.messageImage} source={{ uri: item.image }} />
        <View style={{flexDirection: 'column'}}>
          <Text style={item.sendByUser ? styles.senderMessageName : styles.receiverMessageName}>
            {item.sendByUser ? 'You' : item.name}
          </Text>
          <Text style={styles.messageText}>{item.text}</Text>
        </View>
      </View>
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
        <TouchableOpacity style={styles.sendButton} onPress={()=>handleSendMessage(input)}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.fileButton} >
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
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center'
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
  messageImage: {
    width: 25,
    height: 25,
    borderRadius: 25,
    marginRight: 10
  },
  messageDetails: {
    flex: 1,
    flexDirection: 'column',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  inputBox: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f2f2f2',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  sendButton: {
    backgroundColor: '#0099ff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  fileButton: {
    marginLeft: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f2f2f2',
  },
});
export default ChatPage;


