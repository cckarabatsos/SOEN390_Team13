import React, { useState, useEffect, useRef } from "react";
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
  ActivityIndicator
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { GetAllMessages } from "../api/MessagesAPI";
import { SendMessage } from "../api/MessagesAPI";
import { GetUserInfo } from "../api/GetUsersAPI";
import { Animated } from 'react-native';
import { filterMessage } from "../api/MessagesAPI";
//import { db } from "../firebaseConfig";



type MessageType = {
  id: number,
  text: string,
  sendByUser: boolean,
  name: string,
  image: string,
};


const ChatPage = ({ route, navigation}:any) => {
  const { chatData } = route.params;
  const {isDarkMode} = route.params;
  let userIDContact = chatData.senderID
  let userID = chatData.userID
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState('');
  const [conversationID, setConversationID] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isRead, setIsRead] = useState(true);
  let name = chatData.userName

  const goBack = () => {
    navigation.goBack();
  };

  //{ id: 3,sendByUser:false,name: 'lionel messi',text: '390 project', image: image }

  const handleGetMessages = async () => {
    const message = await GetAllMessages(userID, userIDContact);
    if(message.length!=0){
    const newObjectsArray = await Promise.all(message.usersChat.map(buildObject));
    setMessages(newObjectsArray);
    }
    else{
      setMessages([]);
    }
    setConversationID(message.conversationID);
    setIsLoading(false);
  }
  const { v4: uuidv4 } = require('uuid');

  useEffect(() => {
    handleGetMessages();
  }, []);


  useEffect(() => {
    if (!conversationID) {
        console.log("Ignoring subscription");

        return;
    }
    console.log(
        "Running subscription for conversationID: ",
        conversationID
    );
/* 
    const subscriber = db
      .collection('conversations')
      .doc(conversationID)
      .onSnapshot(documentSnapshot  => {
        handleGetMessages
      });
 */
    return () => {
      console.log("Unsubbing");
      //subscriber();
  };

}, [conversationID]);

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
      isRead: message.isRead,
      name: user.name,
      image: user.picture|| 'https://randomuser.me/api/portraits/men/1.jpg',
      sendByUser: handleIsSentByUser(user.name, message.isRead)
    }
    return obj;
  }

  const handleIsSentByUser = (userName:string, isReadIn:boolean) =>{
    if(userName===name){
 
      if(!isReadIn){
        setIsRead(isReadIn)
      }
      return true
    }

    else { 
      return false
    }
  }



  const handleSendMessage = async (message:string) => {
    //const filteredMessage = await filterMessage(message);
    //await SendMessage(userID, userIDContact, filteredMessage);
    handleGetMessages();
    setInput('')
  };
  
  const fileAttach = () => {
    const [text, setText] = useState('');

  }

  if (isLoading) {
    return (
      <View style={isDarkMode ? darkStyles.loadingContainer : styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  else
  return (
<View style={[styles.container, isDarkMode ? darkStyles.container : styles.container]}>
      <View style={[styles.header, isDarkMode ? darkStyles.header : styles.header, { flexDirection: "row", justifyContent: "space-between" }] }>
        <View  style={{flexDirection:"row", alignItems:"center"}}>
        <TouchableOpacity onPress={goBack}>
          <Ionicons name="arrow-back-outline" size={28} color={isDarkMode ? '#fff' : '#555'} />
        </TouchableOpacity>
        <Image style={styles.profileImage} source={{ uri: chatData.image }} />
        <Text style={[styles.name, isDarkMode ? darkStyles.name : styles.name]}>{chatData.name}</Text>
        </View>
          <View  style={{flexDirection:"row", alignItems:"center", marginHorizontal:10}}>
          <TouchableOpacity style={{alignItems:"flex-end", marginHorizontal:10}}>
            <Ionicons name="call-outline" size={28} color={isDarkMode ? '#fff' : '#555'} />
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems:"flex-end", marginHorizontal:10}}>
            <Ionicons name="videocam-outline" size={28} color={isDarkMode ? '#fff' : '#555'} />
          </TouchableOpacity>
          </View>
      </View>

      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View>
            <View style={[
              isDarkMode ? darkStyles.messageBox : styles.messageBox,
              item.sendByUser ? ( isDarkMode ? darkStyles.senderMessageBox : styles.senderMessageBox) : ( isDarkMode ? darkStyles.receiverMessageBox : styles.receiverMessageBox),
            ]}>
              <Image style={styles.messageImage} source={{ uri: item.image }} />
              <View style={{flexDirection: 'column'}}>
                <Text style={item.sendByUser ? ( isDarkMode ? darkStyles.senderMessageName : styles.senderMessageName) : ( isDarkMode ? darkStyles.receiverMessageName : styles.receiverMessageName)}>
                  {item.sendByUser ? 'You' : item.name}
                </Text>
                <Text style={[styles.messageText, isDarkMode ? darkStyles.messageText : styles.messageText]}>{item.text}</Text>
              </View>
            </View>
          </View>
        )}
        ListFooterComponent={
          <View style={styles.readIndicator}>
            {isRead ?
              <Image style={styles.readIndicatorImage} source={{ uri: chatData.image }} />
              :
              <Ionicons name="checkmark-circle-outline" size={28} color={isDarkMode ? '#fff' : '#555'} /> 
            }
          </View>
  }
/>

    <View style={[styles.inputBox, isDarkMode ? darkStyles.inputBox : styles.inputBox]}>
        <TextInput
          style={[styles.input, isDarkMode ? darkStyles.input : styles.input]}
          value={input}
          onChangeText={text => setInput(text)}
          placeholder='Type a message...'
          placeholderTextColor={isDarkMode ? '#555' : '#ccc'}
        />
        <TouchableOpacity style={styles.sendButton} onPress={() => handleSendMessage(input)}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.fileButton}>
          <Ionicons name="attach" size={24} color={isDarkMode ? '#fff' : '#000'} />
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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
    backgroundColor: '#1e90ff',
    borderRadius: 25,
    padding: 10,
    marginBottom: 5,
    maxWidth: '80%',
  },
  receiverMessageBox: {
    alignSelf: 'flex-start',
    backgroundColor: '#f2f2f2',
    borderRadius: 25,
    padding: 10,
    marginBottom: 5,
    maxWidth: '80%',
  },
  senderMessageName: {
    color: '#000000',
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
  refreshContainer: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    borderWidth: 2,
    borderRadius: 30,
    borderColor: 'gray',
    width: 30,
    height: 30,
  },
  refreshText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'gray',
  },
  readIndicator: {
    alignItems: 'flex-end'
  },
  readIndicatorImage: {
    width: 22,
    height: 22,
    borderRadius: 8,
  },
  unreadIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,

  }
});


const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  messageBox: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: '#333',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  senderMessageBox: {
    alignSelf: 'flex-end',
    backgroundColor: '#3647aacc',
    borderRadius: 25,
    padding: 10,
    marginBottom: 5,
    maxWidth: '80%',
  },
  receiverMessageBox: {
    alignSelf: 'flex-start',
    backgroundColor: '#444',
    borderRadius: 25,
    padding: 10,
    marginBottom: 5,
    maxWidth: '80%',
  },
  senderMessageName: {
    color: '#a3a2a2',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  receiverMessageName: {
    color: '#c4c4c4',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  messageText: {
    fontSize: 16,
    color: '#ffffff',
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
    color: '#fff'
  },
  inputBox: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#333',
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
    backgroundColor: '#1a1a1a',
    color: '#fff'
  },
  sendButton: {
    backgroundColor: '#1e90ff',
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
    backgroundColor: '#333',
  },
  refreshContainer: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    borderWidth: 2,
    borderRadius: 30,
    borderColor: 'gray',
    width: 30,
    height: 30,
  },
  refreshText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'gray',
  },
  readIndicator: {
    alignItems: 'flex-end'
  },
  readIndicatorImage: {
    width: 22,
    height: 22,
    borderRadius: 8,
  },
  unreadIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,

  }
});

export default ChatPage;


