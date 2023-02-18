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
import { UserRequest } from '../api/UserRequestAPI';


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
  const [data, setData] = useState([]);

  let name = route.params.username
  let password = route.params.password
  if(password==null)
    password="<EMPTY>"
  let email = route.params.email
  let image = require("../Components/Images/google-icon.png")
  let userID = 1234
  let text = "Work here now! A robot is a machine—especially one programmable by a computer—capable of carrying out a complex series of actions automatically.[2] A robot can be guided by an external control device, or the control may be embedded within. Robots may be constructed to evoke human form, but most robots are task-performing machines, designed with an emphasis on stark functionality, rather than expressive aesthetics. Robots can be autonomous or semi-autonomous and range from humanoids such as Honda's Advanced Step in Innovative Mobility (ASIMO) and TOSY's TOSY Ping Pong Playing Robot (TOPIO) to industrial robots, medical operating robots, patient assist robots, dog therapy robots, collectively programmed swarm robots, UAV drones such as General Atomics MQ-1 Predator, and even microscopic nano robots. By mimicking a lifelike appearance or automating movements, a robot may convey a sense of intelligence or thought of its own. Autonomous things are expected to proliferate in the future, with home robotics and the autonomous car as some of the main drivers.[3]"

  const handleGetUser = async () => {
  const user = await UserRequest(email)
  const newObjectsArray = user.map(buildObject);
  setData(newObjectsArray);

  // Update the subcategory in CONTENT with the fetched data
  const updatedContent = [...CONTENT];
  updatedContent[0].subcategory = newObjectsArray;
  setListDataSource(updatedContent);
}

useEffect(() => {
  handleGetUser();
}, []);

const buildObject = (jsonObject:any) => {
  const { name, email, userID, currentCompany } = jsonObject;
  const obj = {
    key: 1,
    text: name,
    image: jsonObject.picture,
    userID: userID,
    job: email,
    loc: currentCompany
  }
  return obj;
}

  const CONTENT = [
    {
        isExpanded: true,
        category_name: 'Friend Requests',
        subcategory: []
      },
    {
      isExpanded: false,
      category_name: 'Job Requests',
      subcategory: [
        {key: 1, text: "Amazon.co", image: image, userID: userID, message: text, loc: "MTL", email: "LinkedOutInc@gmail.com"
        , contract: "4 years", category: "Big Boss", position: "CEO", salary: "200k/yr"},
        {key: 2, text: "Microsoft.co", image: image, userID: userID, message: text,loc: "QC", email: "LinkedInInc@gmail.com"
        , contract: "1 years", category: "Small Boss", position: "CEO", salary: "300k/yr"},
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