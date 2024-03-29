import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Image, Modal, ScrollView } from 'react-native';
import {Picker} from '@react-native-picker/picker'
import { GetCompanyAPI } from '../api/GetUsersAPI';
import { followCompanyAPI } from '../api/UserConnectAPI';
import { unfollowCompanyAPI } from '../api/UserConnectAPI';
import {
    ALERT_TYPE,
    Dialog,
    AlertNotificationRoot,
    Toast,
  } from "react-native-alert-notification";
  import Ionicons from "react-native-vector-icons/Ionicons";

interface User {
  id: number;
  name: string;
  occupation: string;
  location: string;
  company: string;
  image: string;
  email: string
  isCompany: boolean
  userID: string
  followerList: string[];
}


const CompanyScreen = ({route}:{route:any}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOccupation, setSelectedOccupation] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState<User>({
    id: 0,
    name: "",
    occupation: "",
    location: "",
    company: "",
    image: "",
    email: "",
    isCompany: false,
    userID: "",
    followerList: []
  });
  const [data, setData] = useState([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [refresh, setRefresh] = useState(false);

  

  let email:String = route.params.email
  let userID1:string = route.params.userID

  let empty = {}

  const handleGetUser = async () => {
    setRefresh(false);
    let user = await GetCompanyAPI(empty)

    const newObjectsArray = user.map(buildObject);
    setData(newObjectsArray);

    // Update the subcategory in CONTENT with the fetched data
    const updatedContent = [...newObjectsArray];
    setAllUsers(updatedContent);
      
  }
  

  const { v4: uuidv4 } = require('uuid');

  const buildObject = (jsonObject:any) => {
    const { name, currentPosition, currentCompany, email,isCompany, userID,followers, bio } = jsonObject;
    const obj = {
      id: uuidv4(),
      name: name,
      occupation: currentPosition,
      location: "New York",
      company: currentCompany,
      email: email,
      //image: jsonObject.picture
      image: jsonObject.picture || 'https://picsum.photos/seed/picsum/200/300',
      isCompany: isCompany,
      userID: userID,
      followerList: followers,
      bio: bio
    }
    console.log(obj)
    return obj;
  }

  const followCompany = async (user_name: String, user_email: String) => {
    setModalVisible(false);
    await followCompanyAPI(user_email, user_name)
    setRefresh(true);
    }


    
  const unfollowCompany = async (user_name: String, user_email: String) => {
    setModalVisible(false);
    await unfollowCompanyAPI(user_email, user_name)
    setRefresh(true);
    }

    
    const viewUserProfile = (user: User) => {
        setUser(user);
        setModalVisible(true);
      }
    
      useEffect(() => {
        handleGetUser();
      }, [refresh]);


  useEffect(() => {
    handleSearch();
  }, [searchTerm, allUsers]);

  const handleSearch = () => {
    const filteredUsers = allUsers.filter(user => {
      const company = user.company.toLowerCase();
      const occupation = user.occupation.toLowerCase();
      const location = user.location.toLowerCase();
      return company.includes(searchTerm.toLowerCase())
        && (!selectedOccupation || occupation.includes(selectedOccupation.toLowerCase()))
        && (!selectedLocation || location.includes(selectedLocation.toLowerCase()));
    });
    setUsers(filteredUsers);
  };

  function isUserInFollowerList(followerList: string[], userID: string): boolean {
    return followerList.includes(userID);
  }

  const handleResetFilters = () => {
    setSelectedOccupation('');
    setSelectedLocation('');
  };

  const modalRender = (user:User) =>{
return( 
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View>
              <TouchableOpacity
                style={styles.buttonModalClose}
                onPress={() => setModalVisible(false)}
              >
                <Ionicons size={30} name="close-outline" color={"red"} />
              </TouchableOpacity>
            </View>
            <View style={styles.modalHeader}>
              <Image style={styles.logoModal} source={{ uri: user.image }} />
              <Text style={styles.modalHeaderText}>{user.company}</Text>
              <Text style={styles.modalBodyText}>{user.occupation}</Text>
              <Text style={styles.modalBodyMessage}>{user.location}</Text>
            </View>
            <View style={styles.modalBody}>
              <Text style={styles.modalBodyText}>Email: {user.email}</Text>
            </View>
            <ScrollView style={styles.scrollview}>
              <Text style={styles.modalBodyText}>Bio: </Text>

              <Text style={styles.modalBodyMessage}>{user.bio}</Text>
            </ScrollView>
            <View style={styles.modalFooter}>
              <View style={styles.modalFooterColumn}>
                
              </View>
              <View style={styles.modalFooterColumn}>
                
              </View>
            </View>
            <View style={styles.modalFooterButton}>
            {isUserInFollowerList(user.followerList, userID1) ? (
              <TouchableOpacity 
                style={styles.buttonModalUnfollow}
                onPress={() => {
                  unfollowCompany(userID1, user.userID);
                }}>
                <Text style={styles.followButtonText}>Unfollow</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.buttonModal}
                onPress={() => {
                  followCompany(userID1, user.userID);
                }}
              >
                <Text style={styles.followButtonText}>Follow</Text>
              </TouchableOpacity>
            )}
            </View>
          </View>
        </View>
      </Modal>
)
  }


  const renderItem = ({ item }: { item: User }) => {
    return (
      <View style={styles.userContainer}> 
        <Image style={styles.userImage} source={{ uri: item.image }} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.company}</Text>
          <Text style={styles.userCompany}>{item.email}</Text>
        </View>
        {isUserInFollowerList(item.followerList, userID1) ? (
              <TouchableOpacity 
                style={styles.followButtonUnfollow}
                onPress={() => {
                  unfollowCompany(userID1, item.userID);
                }}>
                <Text style={styles.followButtonText}>Unfollow</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.followButton}
                onPress={() => {
                  followCompany(userID1, item.userID);
                }}
              >
                <Text style={styles.followButtonText}>Follow</Text>
              </TouchableOpacity>
            )}
    <TouchableOpacity style={styles.followButtonProfile} onPress={() => {
                viewUserProfile(item)}}>
      <Text style={styles.followButtonText}>Profile</Text>
    </TouchableOpacity>
    </View>
    );
  };

  const filteredUsers = users.filter(user => {
    const occupation = user.occupation.toLowerCase();
    const location = user.location.toLowerCase();
    return (!selectedOccupation || occupation.includes(selectedOccupation.toLowerCase()))
      && (!selectedLocation || location.includes(selectedLocation.toLowerCase()));
  });
  
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for Companies"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.filterContainer}>
  {modalRender(user)}
  </View>
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        //onRefresh={handleRefresh}
      />
    </View>
    
  );
};

export default CompanyScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
        },
        backTextWhite: {
            color: "#FFF",
          },
        searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 16,
        marginVertical: 8
        },
        searchInput: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: "#b8b8b8",
        padding: 8,
        width: "90%",
        borderRadius: 30,
        backgroundColor: "#d4d4d4",
        },
        searchButton: {
        backgroundColor: "#0077B5",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 16,
        marginLeft: 8
        },
        searchButtonText: {
        color: 'white'
        },
        filtersContainer: {
        marginHorizontal: 16,
        marginVertical: 8
        },
        filtersTitle: {
        fontWeight: 'bold',
        marginBottom: 8
        },
        filter: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8
        },
        filterTitle: {
        marginRight: 8
        },
        filterInput: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 8
        },
        resetButton: {
        backgroundColor: 'red',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 4,
        alignSelf: 'flex-end'
        },
        resetButtonText: {
        color: 'white'
        },
        userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16
        },
        userImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16
        },
        userInfo: {
        flex: 1
        },
        userName: {
        fontWeight: 'bold',
        marginBottom: 4
        },
        userOccupation: {
        marginBottom: 4
        },
        userLocation: {
        marginBottom: 4
        },
        userCompany: {},
        filterContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
          },
          filterPicker: {
            flex: 1,
            marginLeft: 10,
            marginRight: 10,
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
            fontSize: 14, // smaller font size
            padding: 2, // smaller padding
          },
          pickerItem: {
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
                        fontSize: 14, // smaller font size
          },
          pickerItemDefault: {
            backgroundColor: '#ccc',
          },
          followButton: {
            backgroundColor: "#4c7aaf",
            padding: 10,
            borderRadius: 5,
          },
          followButtonUnfollow: {
            backgroundColor: "#b1b2b3",
            padding: 10,
            borderRadius: 5,
          },
          followButtonProfile: {
            backgroundColor: 'blue',
            padding: 10,
            borderRadius: 5,
            marginLeft: 10,
          },
          followButtonText: {
            color: '#fff',
            fontWeight: 'bold',
            textAlign: 'center',
          }, buttonModalClose: {
            alignItems: "flex-end",
            justifyContent: "flex-end",
            marginBottom: 20,
          },
          modalContent: {
            backgroundColor: "white",
            padding: 20,
            width: "95%",
            height: "80%",
            borderRadius: 10,
          },
          buttonModal: {
            backgroundColor: "#4c7aaf",
            padding: 12,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 16,
            width: "100%",
            height: 50,
            borderRadius: 120,
          },
          buttonModalUnfollow: {
            backgroundColor: "#b1b2b3",
            padding: 12,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 16,
            width: "100%",
            height: 50,
            borderRadius: 120,
          },
          input: {
            borderWidth: 1,
            borderColor: "black",
            padding: 10,
            margin: 10,
          },
          logo: {
            paddingLeft: 20,
            alignSelf: "flex-start",
            width: 60,
            height: 60,
            borderRadius: 50,
          },
          logoModal: {
            width: 80,
            height: 80,
            borderRadius: 50,
            marginBottom: 20,
          },
          titleText: {
            fontSize: 15,
            fontWeight: "bold",
          },
          textSmall: {
            fontSize: 12,
            color: "black",
          },
          textSmallRequest: {
            fontSize: 10,
            color: "black",
            overflow: "hidden",
            whitespace: "nowrap",
            textoverflow: "ellipsis",
            maxwidth: 20,
          },
          modalContainer: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          modalHeader: {
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          },
          modalFooter: {
            position: "absolute",
            bottom: 80,
            left: 0,
            right: 0,
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
          },
          modalFooterButton: {
            position: "absolute",
            bottom: 10,
            left: 10,
            right: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
          },
          modalHeaderText: {
            fontSize: 24,
            fontWeight: "bold",
          },
          modalBody: {
            margin: 10,
          },
          modalBodyText: {
            fontSize: 18,
            marginBottom: 10,
            fontWeight: "bold",
          },
          modalBodyMessage: {
            fontSize: 18,
            marginBottom: 10,
          },
          modalFooterColumn: {
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
          },
          scrollview: {
            maxHeight: 160,
            overflowy: "scroll",
          },

    });