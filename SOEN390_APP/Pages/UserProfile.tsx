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
    Modal,
    ActivityIndicator,
    ImageBackground
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
import { Flex } from '@react-native-material/core';
import { PostUserExperience } from '../api/UserExperienceAPI';
import { PostUserSkills } from '../api/UserSkillsAPI';
import AddExperienceModal from '../Components/ExperienceModal.Component';
import AddSkillsModal from '../Components/SkillsModal.Component';

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


  const ExpandableComponent = ({item, onClickFunction, userID}:any) => {
      //Custom Component for the Expandable List
      const [layoutHeight, setLayoutHeight] = useState(0);

      
  const handleAddExperience = () =>{
    //await PostUserExperience(ownerID, type, atPresent,startDate,endDate,company,position)
  }
  const [isModalVisibleExperience, setIsModalVisibleExperience] = useState<boolean>(false);
  const [isModalVisibleEducation, setIsModalVisibleEducation] = useState<boolean>(false);
  const [isModalVisibleSkills, setIsModalVisibleSkills] = useState<boolean>(false);
  
  const handleAddEducation = async (ownerID:string) =>{
  }
  const handleModalCloseExperience = async () =>{
    setIsModalVisibleExperience(false);
  }
  
  const handleModalCloseEducation = async () =>{
    setIsModalVisibleEducation(false);
  }
  
  const handleModalCloseSkills = async () =>{
    setIsModalVisibleSkills(false);
  }
  
  const handleAddSkills = async (ownerID:string) =>{
    console.log("Skills")
    console.log(ownerID)
    let name = "React Native"
    await PostUserSkills(ownerID, name)
  }
  
    
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
            <TouchableOpacity style={styles.innerHeader} onPress={()=> setIsModalVisibleExperience(true)}> 
                    <Ionicons size={25} name="add-outline" />
                    <AddExperienceModal ownerID={userID} type={"Work"} visible={isModalVisibleExperience} onClose={handleModalCloseExperience} />
                </TouchableOpacity>
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
            <TouchableOpacity style={styles.innerHeader} onPress={()=> setIsModalVisibleEducation(true)}> 
                    <Ionicons size={25} name="add-outline" />
                    <AddExperienceModal ownerID={userID} type={"Education"} visible={isModalVisibleEducation} onClose={handleModalCloseEducation} />
                </TouchableOpacity>
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
              <TouchableOpacity style={styles.innerHeader} onPress={()=> setIsModalVisibleSkills(true)}> 
                    <Ionicons size={25} name="add-outline" />
                    <AddSkillsModal ownerID={userID} visible={isModalVisibleSkills} onClose={handleModalCloseSkills} />
                </TouchableOpacity>
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
          




const UserProfile = ({route,navigation}:{route:any,navigation:any}) => {
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleApplication, setModalVisibleApplication] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  let name = route.params.username
  let password = route.params.password
  if(password==null)
    password="--hidden--"
  let email = route.params.email
  let userID = route.params.userID

  const handleGetUser = async () => {
    const user = await GetUserInfo(userID)
    setUser(user);
    setIsLoading(false);
  }


  useEffect(() => {
    handleGetUser();
    handleGetExperience();
    handleGetEducation();
    handleGetSkills();
  }, [refresh]);

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

  

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  else
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>           
              <ImageBackground
                source={{ uri: "https://source.unsplash.com/1600x900/?nature" }}
                style={styles.backgroundImage}
              >
                    <TouchableOpacity
                              activeOpacity={0.8}
                              onPress={()=>setRefresh(!refresh)}
                              style={{alignSelf: 'flex-start'}}
                              >
                                <Ionicons size={45} name="refresh-circle-outline" style={styles.icon} color={'#000000'}/>
                    </TouchableOpacity>   
                
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
                              //onPress={()=>setRefresh(!refresh)}
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
                                      email={user.userID}
                                      navigation={navigation}
                                      emailUser={user.email}
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
                  </ImageBackground>
            </View>
              <ScrollView>
                {listDataSource.map((item, key) => (
                  <ExpandableComponent
                    key={item.category_name}
                    onClickFunction={() => {
                      updateLayout(key);
                    }}
                    item={item}
                    userID={userID}
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
    subContainer:{
      marginTop:10,
      borderColor: "rgb(145, 140, 224)",
      borderTopWidth: 1,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
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
        borderWidth:1,
        borderRadius: 30,
        marginHorizontal: 10,
        marginVertical:10,
      },
      innerHeader: {
        backgroundColor: '#39f152',
        borderColor: "rgb(0, 0, 0)",
        borderWidth:1,
        borderRadius: 100,
        marginVertical:5,
        alignSelf:"flex-end",
        justifyContent:"center",
        marginRight: 25,
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
      backgroundImage: {
        flex: 1,
        width: "100%",
        height: "100%",
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

