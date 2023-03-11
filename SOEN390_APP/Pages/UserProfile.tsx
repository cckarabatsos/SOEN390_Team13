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
    Image,
    Modal
} from 'react-native';
import React from 'react'
import { useEffect, useState } from "react";
import Basic from '../Components/SwipeList.Component/SwipeListBasic.Component';
import Files from '../Components/SwipeList.Component/SwipeListFiles.Component';
import StandaloneRowSkills from '../Components/SwipeList.Component/SwipeListSkills.Component';
import StandaloneRowExperience from '../Components/SwipeList.Component/SwipeListExperience.Component';
import StandaloneRowEducation from '../Components/SwipeList.Component/SwipeListEducation.Component';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from "@react-navigation/native";
import { LogBox } from 'react-native';
import { GetUserInfo } from '../api/GetUsersAPI';
import { GetUserExperience } from '../api/UserExperienceAPI';
import { GetUserSkills } from '../api/UserSkillsAPI';
import ContactModal from '../Components/contacts.Component'
import ApplicationModal from '../Components/application.Component';
import { GetFile } from '../api/UserFileAPI';

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
      <View style={{
        marginTop:10,
        borderColor: "rgb(145, 140, 224)",
        borderTopWidth: 1,
      }}>
        {/*Header of the Expandable List Item*/}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onClickFunction}
          style={styles.header}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={styles.headerText}>
              {item.category_name}
            </Text>
            <Ionicons size={25} name="list-outline" style={{marginLeft: 10}}/>
          </View>
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
         {/*Header of the Expandable List Item*/}
         <TouchableOpacity
          activeOpacity={0.8}
          onPress={onClickFunction}
          style={styles.header}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={styles.headerText}>
              {item.category_name}
            </Text>
            <Ionicons size={25} name="list-outline" style={{marginLeft: 10}}/>
          </View>
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
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={styles.headerText}>
              {item.category_name}
            </Text>
            <Ionicons size={25} name="list-outline" style={{marginLeft: 10}}/>
          </View>
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
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={styles.headerText}>
              {item.category_name}
            </Text>
            <Ionicons size={25} name="list-outline" style={{marginLeft: 10}}/>
          </View>
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
                      else if (item.category_name == "Files"){
                        return (
                  <View>
                   {/*Header of the Expandable List Item*/}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={onClickFunction}
                style={styles.header}>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                  <Text style={styles.headerText}>
                    {item.category_name}
                  </Text>
                  <Ionicons size={25} name="list-outline" style={{marginLeft: 10}}/>
                </View>
              </TouchableOpacity>
                  <View
                    style={{
                      height: layoutHeight,
                      overflow: 'hidden',
                    }}>
                    {/*Content under the header of the Expandable List Item*/}
                    {item.subcategory.map((item:any, key:any) =>(
                      <Files data = {item}/>
                    ))}
                  </View>
                  </View>
                  );
                            }
        };
        

const UserProfile = ({route}:{route:any}) => {
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleApplication, setModalVisibleApplication] = useState(false);

  let name = route.params.username
  let password = route.params.password
  if(password==null)
    password="--hidden--"
  let email = route.params.email
  let userID = route.params.userID

  const handleGetUser = async () => {
    const user = await GetUserInfo(userID)
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
    const {experienceID, company, atPresent, ownerID, position, startDate, type,endDate, logo } = jsonObject;
    const obj = {
      experienceID: experienceID,
      atPresent: atPresent,
      company: company,
      ownerID: ownerID,
      position: position,
      startDate: startDate,
      endDate: endDate,
      type: type,
      logo: logo|| 'https://picsum.photos/id/5/200/200',
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
    const {experienceID, company, atPresent, ownerID, position, startDate, type,endDate, logo } = jsonObject;
    const obj = {
      experienceID: experienceID,
      atPresent: atPresent,
      company: company,
      ownerID: ownerID,
      position: position,
      startDate: startDate,
      endDate: endDate,
      type: type,
      logo: logo|| 'https://picsum.photos/id/5/200/200',
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

  let bio = user.bio
  let currentPosition = user.currentPosition
  let currentCompany = user.currentCompany
  let image = user.picture || 'https://randomuser.me/api/portraits/men/1.jpg'

        const CONTENT = [
          {
              isExpanded: false,
              category_name: 'Profile',
              subcategory: [
                {key: 1, input: "Name",text: name, userID: userID},
                {key: 4, input: "Password",text: password, userID: userID},
                {key: 2, input: "Bio",text: bio, userID: userID},
                {key: 3, input: "Current Company",text: currentCompany, userID: userID},
                {key: 5, input: "Current Position",text: currentPosition, userID: userID},
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
            {
              isExpanded: false,
              category_name: 'Files',
              subcategory: [
                {key: 1, input: "Cover Letter", userID: userID},
                {key: 2, input: "Resume", userID: userID},
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
{/* <View style={styles.container}>
        <Basic data = {firstName}/>
        <Basic data = {lastName}/>
        <Basic data = {email}/>
        <Basic data = {password}/>
        <StandaloneRow data = {file} />
    </View> */}


  const openContacts = ()=>{
    setModalVisible(true);
  }
  const openApplications = ()=>{
    setModalVisibleApplication(true);
  }
  const handleCloseModal = () => {
    setModalVisible(false);
    setModalVisibleApplication(false);
  }; 
  
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
            <View style={{backgroundColor: "rgb(145, 140, 224)", width: '100%', paddingTop:10}}>
                <View style={styles.logoContainer}>
                  <Image
                  style={styles.logo}
                  source={{ uri: image }}
                  />
                  
                </View>
                <View style={styles.textContainer}>
                <Text style={styles.titleText}> {user.name} </Text>
                </View>
                <View style={{backgroundColor: "rgb(249, 248, 250)", width: '100%',padding: 10, marginTop:10}}>
                  <View style={{flexDirection:'row'}}>
                      <View>                          
                            <TouchableOpacity
                              activeOpacity={0.8}
                              //onPress={}
                              >
                                <Ionicons size={45} name="logo-facebook" style={styles.icon} color={'#2629ce'}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                              activeOpacity={0.8}
                              //onPress={}
                              >
                                <Ionicons size={45} name="logo-github" style={styles.icon}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                              activeOpacity={0.8}
                              //onPress={}
                              >
                                <Ionicons size={45} name="logo-google" style={styles.icon} color={'#17b42c'}/>
                            </TouchableOpacity>                               
                      </View>
                      <View>
                          <Text style={styles.textMed}> {user.currentCompany + " " + user.currentPosition} </Text>
                          <Text style={styles.textMed}> {user.email} </Text>
                          <Text style={styles.textSmall}> {user.bio} </Text>
                          <View>
                            <TouchableOpacity
                              activeOpacity={0.8}
                              //onPress={}
                              style={styles.contactsButtons}>
                                <Ionicons size={35} name="people-outline" style={styles.icon} color={"rgb(145, 140, 224)"} onPress={() => openContacts()}/>
                              <Text style={styles.headerButtonText}>
                                Contacts
                              </Text>
                            </TouchableOpacity>
                            <ContactModal
                                      isVisible={modalVisible}
                                      handleCloseModal={handleCloseModal}
                                      screen={2}
                                      email={user.email}
                                      
                            ></ContactModal>
                            </View>
                            <View>
                            <TouchableOpacity
                              activeOpacity={0.8}
                              //onPress={}
                              style={styles.contactsButtons}>
                                <Ionicons size={35} name="file-tray-full-outline" style={styles.icon} color={"rgb(145, 140, 224)"} onPress={() => openApplications()}/>
                              <Text style={styles.headerButtonText}>
                                Applications
                              </Text>
                            </TouchableOpacity>
                            <ApplicationModal
                                      isVisible={modalVisibleApplication}
                                      handleCloseModal={handleCloseModal}
                                      screen={3}
                                      userID={user.userID}
                            ></ApplicationModal>
                            </View>
                        </View>
                    </View>
                  </View>
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
        fontSize: 30,
        fontWeight: '400',
        justifyContent: 'center'
      },
      header: {
        backgroundColor: '#f5f5f5',
        padding: 20,
        borderColor: "rgb(145, 140, 224)",
        borderBottomWidth: 1,
      },
      headerText: {
        paddingRight: 20,
        fontSize: 22,
        fontWeight: '400',
      },
      headerButtonText: {
        paddingRight: 20,
        fontSize: 16,
        fontWeight: '500',
        color: "rgb(145, 140, 224)"
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
      logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 127,
        height: 127,
        borderRadius: 70,
        borderColor: 'rgb(255, 255, 255)',
        borderWidth: 4,
        alignSelf: 'center',
      },
      textContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
      },
      logo: {
        width: 120,
        height: 120,
        borderRadius: 60,
      },
      textSmall: {
        fontSize: 16,
        color: 'gray',
      },
      textMed: {
        fontSize: 16,
        color: 'black',
      },
      contactsButtons: {
        //backgroundColor:'#84a8f5',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,  
        width: 125,
        height: 35,
        paddingLeft:10
      },
      icon: {
        marginRight: 5, // Optional - adjust the spacing between the icon and text
      },
})

