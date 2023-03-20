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
  ActivityIndicator
} from "react-native";

import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GetActiveConversations } from "../api/MessagesAPI";
import { GetUserInfo } from "../api/GetUsersAPI";
import ChatPage from "./Chatpage";


type ConversationType = {
  id: number,
  lastMessage: boolean,
  name: string,
  image: string,
  timestamp: string,
  email: string
  emailUser:string
  userName:string
};

const Messages  = ({ route, navigation }:any) => {
  const Stack = createNativeStackNavigator();
  let emailUser = route.params.email
  let userID = route.params.userID
  let username = route.params.username
  
  const [conversations, setConversations] = useState<ConversationType[]>([]);
  const [allMessages, setAllMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  
  
  const handleGetConversations = async () => {
    const message = await GetActiveConversations(emailUser);
    const newObjectsArray = await Promise.all(message.map(buildObject));
    setConversations(newObjectsArray);
    setIsLoading(false);
  }
  const { v4: uuidv4 } = require('uuid');
  
  useEffect(() => {
    handleGetConversations();
  }, []);
  
  //const { v4: uuidv4 } = require('uuid');
  const handleGetUserInfo = async(userID:string) =>{
  const userInfo = await GetUserInfo(userID)
  //console.log(userInfo)
  return userInfo
  }
  
  //const { v4: uuidv4 } = require('uuid');
  const handleGetLastMessage = async(user:string) =>{
    const userInfo = ""
    return userInfo
    }
  
  const buildObject = async (jsonObject:any) => {
    const { ActiveUser, message } = jsonObject;
    let activeUser:string = ""
    let message1 =""
    let date = new Date()
    let isRead1 = false

    ActiveUser.forEach((element: any) => {
      if(element!==userID){
        activeUser = element
      }
    });

    if(message!=null){
      message1=message.content
      const timestamp = message.timestamp
      date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
      isRead1= message.isRead
      console.log(message1)
      console.log(isRead1)
      console.log(timestamp)
      console.log(date)
    }

    const user = await handleGetUserInfo(activeUser)

    const options: Intl.DateTimeFormatOptions = { 
      timeStyle: 'short', 
      dateStyle: 'medium', 
      year: undefined, // remove the year option
      hour12: true,
    };
    const formattedDate = date.toLocaleString('en-US', options);

    const obj = {
      id: uuidv4(),
      name: user.name,
      image: user.picture|| 'https://randomuser.me/api/portraits/men/1.jpg',
      lastMessage: message1,
      timestamp: formattedDate, 
      email: user.email,
      emailUser: emailUser,
      userName: username,
      isRead: isRead1
    }
    return obj;
  }
  
  const chatData = conversations;


  const ChatHistoryItem = ({ chatData, onPress }:any) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.chatBox}>
        <View style={styles.chatInfo}>
          <Image style={styles.userImage} source={{ uri: chatData.image }} />
          <Text style={styles.name}>{chatData.name}</Text>
          <Text style={styles.lastMessage}>{chatData.lastMessage}</Text>
        </View>
        <Text style={styles.timestamp}>{chatData.timestamp}</Text>
        <View style={styles.readIndicator}>
          {chatData.isRead ?
            <Image style={styles.readIndicatorImage} source={{ uri: chatData.image }} />
            :
            <Ionicons name="checkmark-circle-outline" size={28} color="#555" /> 
          }
         </View>
      </View>
    </TouchableOpacity>
  );
  
  const ChatHistory = ({ navigation }:any) => {
   
    const renderItem = ({ item }:any) => (
      <ChatHistoryItem chatData={item} onPress={() => navigation.navigate('Chatpage', { chatData: item })} />
    );
    
    return (
      <View style={styles.container}>
        <FlatList
          data={conversations}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  else
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      
      <Stack.Screen name="Chats" component={ChatHistory} />
      <Stack.Screen name="Chatpage" component={ChatPage} />
    </Stack.Navigator>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  chatBox: {
    flexDirection: 'row',
    
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16
    },
  chatInfo: {
    flex: 1,
    marginLeft: 16
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  lastMessage: {
    fontSize: 16,
    color: '#696969'
  },
  timestamp: {
    fontSize: 16,
    color: '#696969',
    marginRight: 10
  },
  readIndicator: {
    alignItems: 'center'
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

export default Messages;
