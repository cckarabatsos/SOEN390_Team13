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
import Basic from '../Components/SwipeList.Component/SwipeListBasic.Component';
import StandaloneRowSkills from '../Components/SwipeList.Component/SwipeListSkills.Component';
import StandaloneRowExperience from '../Components/SwipeList.Component/SwipeListExperience.Component';
import StandaloneRowEducation from '../Components/SwipeList.Component/SwipeListEducation.Component';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from "@react-navigation/native";
import { LogBox } from 'react-native';
import { GetUserInfo } from '../api/GetUsersAPI';
import { GetUserExperience } from '../api/UserExperienceAPI';
import { GetUserSkills } from '../api/UserSkillsAPI';

interface User {
  id: number;
  name: string;
  occupation: string;
  location: string;
  company: string;
  image: string;
  email: string
  userID: String
}

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
  
    if(item.category_name == "Profile"){
    return (
      <View>
        {/*Header of the Expandable List Item*/}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onClickFunction}
          style={styles.header}>
            <Ionicons size={20} name="list-outline"/>
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
            <Basic data = {item}/>
          ))}
        </View>
      </View>
    );
          }
          else if (item.category_name == "Experience"){
             return (
      <View>
        {/*Header of the Expandable List Item*/}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onClickFunction}
          style={styles.header}>
            <Ionicons size={20} name="list-outline"/>
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
            <StandaloneRowExperience data = {item}/>
          ))}
        </View>
      </View>
    );
          }
    else if (item.category_name == "Education"){
            return (
      <View>
      {/*Header of the Expandable List Item*/}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onClickFunction}
        style={styles.header}>
          <Ionicons size={20} name="list-outline"/>
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
          <StandaloneRowEducation data = {item}/>
        ))}
      </View>
      </View>
      );
                }
      else if (item.category_name == "Skills"){
                  return (
            <View>
            {/*Header of the Expandable List Item*/}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onClickFunction}
              style={styles.header}>
                <Ionicons size={20} name="list-outline"/>
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
                <StandaloneRowSkills data = {item}/>
              ))}
            </View>
            </View>
            );
                      }
        };
        

const UserProfile = ({route}:{route:any}) => {
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);

  let name = route.params.username
  let password = route.params.password
  if(password==null)
    password="--hidden--"
  let email = route.params.email
  let userID = route.params.userID

  const handleGetUser = async () => {
    console.log("INSIDE---------------------------------")
    const user = await GetUserInfo(userID)
    console.log(user)
    setUser(user);
  }


  useEffect(() => {
    handleGetUser();
    handleGetExperience();
    handleGetEducation();
    handleGetSkills();
  }, []);

  const handleGetExperience = async () => {
    const user = await GetUserExperience(userID, "Work")
    const newObjectsArray = user.map(buildObjectExperience);
    setData(newObjectsArray);
    // Update the subcategory in CONTENT with the fetched data
    const updatedContent = [...CONTENT];
    updatedContent[1].subcategory = newObjectsArray;
    setListDataSource(updatedContent);
  }

  const buildObjectExperience = (jsonObject:any) => {
    const {experienceID, company, atPresent, ownerID, position, startDate, type,endDate } = jsonObject;
    const obj = {
      experienceID: experienceID,
      atPresent: atPresent,
      company: company,
      ownerID: ownerID,
      position: position,
      startDate: startDate,
      endDate: endDate,
      type: type
    }
    return obj;
  }

  const handleGetEducation = async () => {
    const user = await GetUserExperience(userID, "Education")
    const newObjectsArray = user.map(buildObjectEducation);
    setData(newObjectsArray);
    // Update the subcategory in CONTENT with the fetched data
    const updatedContent = [...CONTENT];
    updatedContent[2].subcategory = newObjectsArray;
    setListDataSource(updatedContent);
  }

  const buildObjectEducation = (jsonObject:any) => {
    const {experienceID, company, atPresent, ownerID, position, startDate, type,endDate } = jsonObject;
    const obj = {
      experienceID: experienceID,
      atPresent: atPresent,
      company: company,
      ownerID: ownerID,
      position: position,
      startDate: startDate,
      endDate: endDate,
      type: type
    }
    return obj;
  }


  const handleGetSkills = async () => {
    const user = await GetUserSkills(userID)
    const newObjectsArray = user.map(buildObjectSkills);
    setData(newObjectsArray);
    // Update the subcategory in CONTENT with the fetched data
    const updatedContent = [...CONTENT];
    updatedContent[3].subcategory = newObjectsArray;
    setListDataSource(updatedContent);
  }

  const buildObjectSkills = (jsonObject:any) => {
    const {name, skillID, ownerID} = jsonObject;
    const obj = {
      name: name,
      ownerID: ownerID,
      skillID: skillID
    }
    return obj;
  }
        const CONTENT = [
          {
              isExpanded: false,
              category_name: 'Profile',
              subcategory: [
                {key: 1, input: "Name",text: name},
                {key: 3, input: "Email",text: email},
                {key: 4, input: "Password",text: password},
              ],
            },
          {
            isExpanded: false,
            category_name: 'Experience',
            subcategory: [],
          },
          {
            isExpanded: false,
            category_name: 'Education',
            subcategory: [],
          },
          {
              isExpanded: false,
              category_name: 'Skills',
              subcategory: [],
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
{/* <View style={styles.container}>
        <Basic data = {firstName}/>
        <Basic data = {lastName}/>
        <Basic data = {email}/>
        <Basic data = {password}/>
        <StandaloneRow data = {file} />
    </View> */}
    
  return (
      <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
            <View style={{backgroundColor: "rgb(208, 164, 245)", height: 225, width: '100%',padding: 10}}>
                <Image
                style={styles.logo}
                source={{ uri: user.picture }}
                />
                <Text style={styles.titleText}> {user.name} </Text>
                <Text style={styles.textSmall}> {user.currentCompany + " " + user.currentPosition} </Text>
                <Text style={styles.textSmall}> {user.bio} </Text>
            </View>

        </View>
        <ScrollView>
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
    </SafeAreaView>
  );
}


export default UserProfile

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
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
      },
      headerText: {
        paddingRight: 20,
        fontSize: 16,
        fontWeight: '500',
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
})

