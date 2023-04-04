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
  const [isDarkMode, setIsDarkMode] = useState(false);

  
  
  const handleGetConversations = async () => {
    const message = await GetActiveConversations(userID);
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
      isRead: isRead1,
      senderID: user.userID,
      userID: userID
    }
    return obj;
  }
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  const chatData = conversations;


  const ChatHistoryItem = ({ chatData, onPress  }:any) => (
    <TouchableOpacity onPress={onPress}>
    <View style={[styles.chatBox, isDarkMode ? darkStyles.chatBox : styles.chatBox]}>
      <View style={styles.chatInfo}>
        <Image style={styles.userImage} source={{ uri: chatData.image }} />
        <View style={styles.messageInfo}>
          <View style={styles.nameAndTime}>
            <Text style={[styles.name, isDarkMode ? darkStyles.name : styles.name]}>{chatData.name}</Text>
            <Text style={[styles.timestamp, isDarkMode ? darkStyles.timestamp : styles.timestamp]}>{chatData.timestamp}</Text>
          </View>
          <Text style={[styles.lastMessage, isDarkMode ? darkStyles.lastMessage : styles.lastMessage]}>{chatData.lastMessage}</Text>
        </View>
      </View>
      {chatData.isRead ? (
        <View style={styles.readIndicator}>
          <Image style={styles.readIndicatorImage} source={{ uri: chatData.image }} />
        </View>
      ) : (
        <Ionicons name="checkmark-circle-outline" size={25} color="#555" /> 
      )}
    </View>
  </TouchableOpacity>
  );
  
  const ChatHistory = ({ navigation }:any) => {
   
    const renderItem = ({ item }:any) => (
      <ChatHistoryItem chatData={item} onPress={() => navigation.navigate('Chatpage', { chatData: item, isDarkMode: isDarkMode })} />
    );
    
    return (

<View style={[styles.container, isDarkMode ? darkStyles.container : styles.container]}>
    <View style={[styles.header, isDarkMode ? darkStyles.header : styles.header]}>
      <Image style={styles.logo} source={require('../Components/Images/linkedout-logo.png') } />
      <Text style={[styles.headerTitle, isDarkMode ? darkStyles.headerTitle : styles.headerTitle]}>Chats</Text>
      <View style={{flexDirection:"row"}}>
      <TouchableOpacity onPress={() => console.log('Settings pressed')} style={{marginHorizontal:15}}>
        <Ionicons name="settings-sharp" size={28} color={isDarkMode ? '#fff' : '#333'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleDarkMode}>
        <Ionicons name={isDarkMode ? 'sunny-outline' : 'moon-outline'} size={28} color={isDarkMode ? '#fff' : '#333'} />
      </TouchableOpacity>
      </View>
    </View>
    <FlatList
      data={conversations}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      style={[styles.chatList, isDarkMode ? darkStyles.chatList : styles.chatList]}
    />
    <View style={[styles.footer, isDarkMode ? darkStyles.footer : styles.footer]}>
    </View>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  chatList: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chatBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  chatInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  messageInfo: {
    flex: 1,
  },
  nameAndTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timestamp: {
    fontSize: 12,
    color: '#aaa',
  },
  lastMessage: {
    fontSize: 14,
    color: '#888',
  },
  readIndicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  readIndicatorImage: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  unreadIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#1a73e8',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#fff',
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    backgroundColor: '#111',
    borderBottomColor: '#666',

  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#fff',
  },
  chatList: {
    flex: 1,
    backgroundColor: '#111',

  },
  chatBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    backgroundColor: '#111',
    borderBottomColor: '#666',
  },
  chatInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  messageInfo: {
    flex: 1,
  },
  nameAndTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  timestamp: {
    fontSize: 12,
    color: '#aaa',
  },
  lastMessage: {
    fontSize: 14,
    color: '#ccc',
  },
  readIndicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  readIndicatorImage: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  unreadIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#1a73e8',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#111',
  },
});


export default Messages;
