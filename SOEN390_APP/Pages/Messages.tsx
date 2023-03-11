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
};

const Messages  = ({ route, navigation }:any) => {
  const Stack = createNativeStackNavigator();
  let emailUser = route.params.email
  
  const [conversations, setConversations] = useState<ConversationType[]>([]);
  const [allMessages, setAllMessages] = useState([]);
  const [input, setInput] = useState('');

  
  
  const handleGetConversations = async () => {
    const message = await GetActiveConversations(emailUser);
  
    const newObjectsArray = await Promise.all(message.map(buildObject));
    setConversations(newObjectsArray);
      
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
    const { email, message } = jsonObject;
    const user = await handleGetUserInfo(message.senderId)
    const obj = {
      id: uuidv4(),
      name: user.name,
      image: user.picture|| 'https://randomuser.me/api/portraits/men/1.jpg',
      lastMessage: message.content,
      timestamp: message.timestamp, 
      email: user.email,
      emailUser: emailUser
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
        <Text style={styles.timestamp}>{chatData.timestamp.seconds}</Text>
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
    color: '#696969'
  }
});

export default Messages;
