import {
  Dimensions,
  StyleSheet,
  Text,
  SafeAreaView,
  LayoutAnimation,
  View,
  ScrollView,
  UIManager,
  TouchableOpacity,
  Platform,
  Image
} from 'react-native';
import React from 'react'
import { useEffect, useState } from "react";
import FriendRequestRow from '../Components/SwipeList.Component/SwipeListFriendRequests.Component';
import JobRequestRow from '../Components/SwipeList.Component/SwipeListJobRequests.Component';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from "@react-navigation/native";
import { LogBox } from 'react-native';



const ExpandableComponent = ({item, onClickFunction}:any) => {
  //Custom Component for the Expandable List
  const [layoutHeight, setLayoutHeight] = useState(0);

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
}, [])

  useEffect(() => {
    if (item.isExpanded) {
      setLayoutHeight(null);
    } else {
      setLayoutHeight(0);
    }
  }, [item.isExpanded]);

  if(item.category_name == "Friend Requests" ){
  return (
    <View>
      {/*Header of the Expandable List Item*/}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onClickFunction}
        style={styles.header}>
          <Ionicons size={20} name="add-circle"/>
          <Text style={styles.requestText}> {item.subcategory.length}</Text>
        <Text style={styles.headerText}>
          {item.category_name}
        </Text>
      </TouchableOpacity>
      <View 
        style={{
          height: layoutHeight,
          overflow: 'scroll',
        }}>
        {/*Content under the header of the Expandable List Item*/}
        {item.subcategory.map((item:any, key:any) =>(
          <FriendRequestRow data = {item}/>
        ))}
      </View>
    </View>
  );
        }
        else{
           return (
      <View>
      {/*Header of the Expandable List Item*/}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onClickFunction}
        style={styles.header}>
          <Ionicons size={20} name="add-circle"/>
          <Text style={styles.requestText}> {item.subcategory.length}</Text>
        <Text style={styles.headerText}>
          {item.category_name}
        </Text>
      </TouchableOpacity>
      <View
        style={{
          height: layoutHeight,
          overflow: 'hidden',
        }}>
        {/*Content under the header of the Expandable List Item*/}
        {item.subcategory.map((item:any, key:any) =>(
          <JobRequestRow data = {item}/>
        ))}
      </View>
    </View>
  );
        }
};

const Inbox = ({route}:{route:any}) => {

  let name = route.params.username
  let password = route.params.password
  if(password==null)
    password="<EMPTY>"
  let email = route.params.email
  let image = require("../Components/Images/google-icon.png")
  let userID = 1234
  let text = "Work here now!"

  const CONTENT = [
    {
        isExpanded: true,
        category_name: 'Friend Requests',
        subcategory: [
          {key: 1, text: "Jonny", image: image, userID: userID, job: "Software Engineer", loc: "Montreal"},
          {key: 2, text: "Mike", image: image, userID: userID, job: "Civil Engineer", loc: "Laval"},
          {key: 3, text: "Henry", image: image, userID: userID, job: "Civil Engineer", loc: "Laval"},
        ],
      },
    {
      isExpanded: false,
      category_name: 'Job Requests',
      subcategory: [
        {key: 1, text: name, image: image, userID: userID, message: text},
        {key: 2, text: name, image: image, userID: userID, message: text},
      ],
    },
  ];

  const [listDataSource, setListDataSource] = useState(CONTENT);

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const updateLayout = (index:any) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...listDataSource];

      array[index]['isExpanded'] = !array[index]['isExpanded'];
    
    setListDataSource(array);
  };

  return (
   
    <SafeAreaView style={{flex: 1,}}>
      <View style={styles.container}>
        <View style={{flexDirection: 'column'}}>
          <View style={styles.inboxContainer}>
            <Text style={styles.inboxText}> Notification Inbox </Text></View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <ScrollView style={{flex: 1}}>
            {listDataSource.map((item, key) => (
              <ExpandableComponent
                key={item.category_name}
                onClickFunction={() => {
                  updateLayout(key);
                }}
                item={item}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
   
  )
}

export default Inbox

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
},
inboxContainer: {
  backgroundColor: 'rgb(208, 164, 245)',
  height:50,
  justifyContent: 'center',
  alignItems: 'center',
},
requestText:{
  fontSize: 20,
  fontWeight: 'bold',
  marginRight: 7,
},
inboxText:{
  textAlign: 'center',
  fontSize: 18,
  fontWeight: 'bold',
},
switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 50,
    flexWrap: 'wrap',
},
switch: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    marginVertical: 2,
    paddingVertical: 10,
    width: Dimensions.get('window').width / 3,
},  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 20,
    flexDirection: 'row-reverse',
    borderBottomColor: "black",
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  headerText: {
    textAlign: 'left',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  rightText: {
    fontSize: 16,
    fontWeight: '500',
    alignItems:'center'
  },
  separator: {
    height: 0.5,
    backgroundColor: '#808080',
    width: '95%',
    marginLeft: 16,
    marginRight: 16,
  },
  text: {
    fontSize: 16,
    color: '#606070',
    padding: 10,
  },
  content: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',  
  },
    logo: {
    paddingLeft: 20,
    alignSelf: 'flex-start',
    width: 125,
    height: 125,
    borderRadius: 50
  },
  textSmall: {
    fontSize: 16,
    color: 'black',
  },
  fullScreen: {
    width: Dimensions.get('window').width,
    }
})