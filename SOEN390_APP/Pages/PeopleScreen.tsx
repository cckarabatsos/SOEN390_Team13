import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Image, Modal, ScrollView } from 'react-native';
import {Picker} from '@react-native-picker/picker'
import { GetUsersAPI } from '../api/GetUsersAPI';
import { UserConnectAPI } from '../api/UserConnectAPI';
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
}


const PeopleScreen = ({route}:{route:any}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOccupation, setSelectedOccupation] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  let email:String = route.params.email

  let empty = {}

  const handleGetUser = async () => {
    const user = await GetUsersAPI(empty)
    const newObjectsArray = user.map(buildObject);
    setData(newObjectsArray);
  
    // Update the subcategory in CONTENT with the fetched data
    const updatedContent = [...allUsers, ...newObjectsArray];
    setAllUsers(updatedContent);
  }
  
  useEffect(() => {
    handleGetUser();
    handleSearch();
  }, []);

  const { v4: uuidv4 } = require('uuid');

  const buildObject = (jsonObject:any) => {
    const { name, currentPosition, currentCompany, email,isCompany } = jsonObject;
    const obj = {
      id: uuidv4(),
      name: name,
      occupation: currentPosition,
      location: "New York",
      company: currentCompany,
      email: email,
      //image: jsonObject.picture
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      isCompany: isCompany
    }
    return obj;
  }

  const connectWithUser = async (user_name: String, user_email: String) => {
    setModalVisible(false);

    let responce = UserConnectAPI(user_email, email)
    if(await responce)
    Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "REQUEST SENT",
        textBody: "Connection request to: "+ user_name,
      });
      else 
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "REQUEST PENDING",
      });
    }

    
    const viewUserProfile = (user: User) => {
        setUser(user);
        setModalVisible(true);
      }

  useEffect(() => {
    handleSearch();
  }, [searchTerm, allUsers]);

  const handleSearch = () => {
    const filteredUsers = allUsers.filter(user => {
      const name = user.name.toLowerCase();
      const occupation = user.occupation.toLowerCase();
      const location = user.location.toLowerCase();
      return name.includes(searchTerm.toLowerCase())
        && (!selectedOccupation || occupation.includes(selectedOccupation.toLowerCase()))
        && (!selectedLocation || location.includes(selectedLocation.toLowerCase()));
    });
    setUsers(filteredUsers);
  };

  const handleResetFilters = () => {
    setSelectedOccupation('');
    setSelectedLocation('');
  };

  const modalRender = (user:any) =>{
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
              <Text style={styles.modalHeaderText}>{user.name}</Text>
              <Text style={styles.modalBodyText}>{user.occupation}</Text>
              <Text style={styles.modalBodyMessage}>{user.location}</Text>
            </View>
            <View style={styles.modalBody}>
              <Text style={styles.modalBodyText}>Email: {user.email}</Text>
            </View>
            <ScrollView style={styles.scrollview}>
              <Text style={styles.modalBodyText}>Bio: </Text>

              <Text style={styles.modalBodyMessage}>{"message"}</Text>
            </ScrollView>
            <View style={styles.modalFooter}>
              <View style={styles.modalFooterColumn}>
                
              </View>
              <View style={styles.modalFooterColumn}>
                
              </View>
            </View>
            <View style={styles.modalFooterButton}>
              <TouchableOpacity
                style={styles.buttonModal}
                onPress={() => connectWithUser(user.name, user.email)}
              >
                <Text style={styles.backTextWhite}>Connect</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
)
  }


  const renderItem = ({ item }: { item: User }) => {
    if(!item.isCompany)
    return (
      <View style={styles.userContainer}> 
        <Image style={styles.userImage} source={{ uri: item.image }} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.userOccupation}>{item.occupation}</Text>
          <Text style={styles.userLocation}>{item.location}</Text>
          <Text style={styles.userCompany}>{item.company}</Text>
        </View>
        <TouchableOpacity style={styles.followButton} onPress={() => {
                connectWithUser(item.name, item.email)}}>
      <Text style={styles.followButtonText}>Connect</Text>
    </TouchableOpacity>
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
          placeholder="Search for people by name"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.filterContainer}>
  <Picker
    selectedValue={selectedOccupation}
    onValueChange={itemValue => setSelectedOccupation(itemValue)}
    style={styles.filterPicker}
  >
    <Picker.Item style={styles.pickerItemDefault} label="Select occupation" value={null} />
    <Picker.Item style={styles.pickerItem} label="Designer" value="Designer" />
    <Picker.Item style={styles.pickerItem} label="Developer" value="Developer" />
    <Picker.Item style={styles.pickerItem} label="Manager" value="Manager" />
  </Picker>
  <Picker
    selectedValue={selectedLocation}
    onValueChange={itemValue => setSelectedLocation(itemValue)}
    style={styles.filterPicker}
  >
    <Picker.Item style={styles.pickerItemDefault} label="Select location" value={null} />
    <Picker.Item style={styles.pickerItem} label="New York" value="New York" />
    <Picker.Item style={styles.pickerItem} label="San Francisco" value="San Francisco" />
    <Picker.Item style={styles.pickerItem} label="London" value="London" />
  </Picker>
  {modalRender(user)}
</View>
      <FlatList
        data={filteredUsers}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
    
  );
};

export default PeopleScreen

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
            backgroundColor: '#4caf50',
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
            backgroundColor: "#4caf50",
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