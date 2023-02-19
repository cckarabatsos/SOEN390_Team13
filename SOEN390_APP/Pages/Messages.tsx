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


import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatPage from "./Chatpage";

const Stack = createNativeStackNavigator();


const chatData = [
  {
    id: '1',
    name: 'Cedric Michaud ',
    lastMessage: 'did you watch the basketball game',
    timestamp: '42m ago',
    image: 'https://randomuser.me/api/portraits/men/1.jpg'
   // profilePic: require('./assets/profile-pic-1.png')
  },
  {
    id: '2',
    name: 'Bogdan Podariu',
    lastMessage: 'I have a computer vision exam.',
    timestamp: '2h ago',
    image: 'https://randomuser.me/api/portraits/men/1.jpg'
    //profilePic: require('./assets/profile-pic-2.png')
  },
  {
    id: '3',
    name: 'Lebron James',
    lastMessage: 'I have the most points in nba history',
    timestamp: '4h ago',
    image: 'https://randomuser.me/api/portraits/men/1.jpg'
   // profilePic: require('./assets/profile-pic-3.png')
  },
  {
    id: '4',
    name: 'Michael Jordan',
    lastMessage: 'Hello?',
    timestamp: '11h ago',
    image: 'https://randomuser.me/api/portraits/men/1.jpg'
   // profilePic: require('./assets/profile-pic-3.png')
  },
  {
    id: '5',
    name: 'Bill Gates',
    lastMessage: 'kiet',
    timestamp: '17h ago',
    image: 'https://randomuser.me/api/portraits/men/1.jpg'
   // profilePic: require('./assets/profile-pic-3.png')
  },
  {
    id: '6',
    name: 'Elon Musk',
    lastMessage: 'tesla',
    timestamp: '2d ago',
    image: 'https://randomuser.me/api/portraits/men/1.jpg'
   // profilePic: require('./assets/profile-pic-3.png')
  },
];

const ChatHistoryItem = ({ chatData, onPress }:any) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.chatBox}>
      <View style={styles.chatInfo}>
        <Image style={styles.userImage} source={{ uri: chatData.image }} />
        <Text style={styles.name}>{chatData.name}</Text>
        <Text style={styles.lastMessage}>{chatData.lastMessage}</Text>
      </View>
      <Text style={styles.timestamp}>{chatData.timestamp}</Text>
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
        data={chatData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

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

const Messages = () => (
  <Stack.Navigator screenOptions={{
    headerShown: false
  }}>
    
    <Stack.Screen name="Chats" component={ChatHistory} />
    <Stack.Screen name="Chatpage" component={ChatPage} />
  </Stack.Navigator>
);

export default Messages;
