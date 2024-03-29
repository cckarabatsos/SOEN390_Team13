import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Image, Modal, ScrollView } from 'react-native';
import {Picker} from '@react-native-picker/picker'
import {
    ALERT_TYPE,
    Dialog,
    AlertNotificationRoot,
    Toast,
  } from "react-native-alert-notification";
  import Ionicons from "react-native-vector-icons/Ionicons";
  import { JobSearch } from '../api/JobPostingAPI';
  import AddJobOfferModal from '../Components/JobOfferModal.Component';

  interface JobOffer {
    key: number;
    text: string;
    image: string;
    userID: string;
    message: string;
    loc: string;
    email: string;
    contract: string;  
    category: string;
    position: string;
    salary: string;
    title: string;
    logo: string;
    postingID: string;
  }
  
  
  const JobOfferScreen = ({route}:{route:any}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
    const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [isModalVisibleJobOffer, setIsModalVisibleJobOffer] = useState(false);
    const [job, setJob] = useState({});
    const [data, setData] = useState([]);
    const [allUsers, setAllUsers] = useState<JobOffer[]>([]);
    const [locations, setLocations] = useState<string[]>([]);
    const [positions, setPositions] = useState<string[]>([]);

    let empty = ""
    let userID1:string = route.params.userID

    const handleGetUser = async () => {
      const user = await JobSearch(empty)
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
      const { type, company, contract, description, email, jobPosterID, location, position, postingID, salary, logo } = jsonObject;
      // Check if location already exists in the allUsers array
      const locationExists = allUsers.some(user => user.loc === location);

      // Add location to the locations array if it doesn't already exist
      const newLocations = locationExists ? [] : [location, ...locations];

            // Check if location already exists in the allUsers array
            const positionExists = allUsers.some(user => user.position === position);

            // Add location to the locations array if it doesn't already exist
            const newPositions = positionExists ? [] : [position, ...positions];
      

      const obj = {
        key: uuidv4(),
        text: company,
        image: jsonObject.picture || 'https://picsum.photos/id/5/200/200',
        userID: jobPosterID,
        message: description,
        loc: location,
        email: email,
        contract: contract,
        category: type,
        position: position,
        salary: salary,
        title: position,
        logo: logo|| 'https://picsum.photos/id/5/200/200',
        postingID: postingID,
          }
            // Update the locations state with the new locations array
      setLocations(prevLocations => [...prevLocations, ...newLocations.filter(loc => !prevLocations.includes(loc))]);

           // Update the locations state with the new locations array
      setPositions(prevPositions => [...prevPositions, ...newPositions.filter(position => !prevPositions.includes(position))]);
      return obj;
    }

    
    const viewJobOffer = (job: JobOffer) => {
        setJob(job);
        setModalVisible(true);
      }

  useEffect(() => {
    handleSearch();
  }, [searchTerm, allUsers]);

  const handleSearch = () => {
    const filteredUsers = allUsers.filter(user => {
      const name = user.text.toLowerCase();
      const position = user.position.toLowerCase();
      const location = user.loc.toLowerCase();
      return name.includes(searchTerm.toLowerCase())
        && (!selectedCategory || position.includes(selectedCategory.toLowerCase()))
        && (!selectedLocation || location.includes(selectedLocation.toLowerCase()));
    });
    setJobOffers(filteredUsers);
  };


  const handleResetFilters = () => {
    setSelectedCategory('');
    setSelectedLocation('');
  };



const modalRender = (item:any) =>{
  const handleOnPress = () => {
    setIsModalVisibleJobOffer(true) 
  }

  const handleModalCloseJobOffer = () => {
    setIsModalVisibleJobOffer(false) 
  }
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
          <Image style={styles.logoModal} source={{ uri: item.logo }} />
          <Text style={styles.modalHeaderText}>{item.position}</Text>
          <Text style={styles.modalBodyText}>{item.text}</Text>
          <Text style={styles.modalBodyMessage}>{item.loc}</Text>
        </View>
        <View style={styles.modalBody}>
          <Text style={styles.modalBodyText}>Email: {item.email}</Text>
        </View>
        <ScrollView style={styles.scrollview}>
          <Text style={styles.modalBodyText}>Job Description: </Text>

          <Text style={styles.textSmallRequest}>{item.message}</Text>
        </ScrollView>
        <View style={styles.modalFooter}>
          <View style={styles.modalFooterColumn}>
            <Text style={styles.modalBodyText}>Salary</Text>
            <Text style={styles.modalBodyMessage}>{item.salary}</Text>
          </View>
          <View style={styles.modalFooterColumn}>
            <Text style={styles.modalBodyText}>Contract</Text>
            <Text style={styles.modalBodyMessage}>{item.contract}</Text>
          </View>
        </View>
        <View style={styles.modalFooterButton}>
            <TouchableOpacity style={styles.buttonModal} onPress={()=> {handleOnPress()}}> 
    
            <Text style={styles.backTextWhite}>Send Job Offer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
      <AddJobOfferModal
        ownerID={userID1}
        postingID={item.postingID}
        visible={isModalVisibleJobOffer}
        onClose={handleModalCloseJobOffer}
      />
  </Modal>
)
  }


  const renderItem = ({ item }: { item: JobOffer }) => {
    return (
      <View style={styles.userContainer}> 
        <Image style={styles.userImage} source={{ uri: item.logo }} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.title}</Text>
          <Text style={styles.userOccupation}>{item.text}</Text>
          <Text style={styles.userLocation}>{item.loc}</Text>
          <Text style={styles.userCompany}>{item.salary}</Text>
        </View>
    <TouchableOpacity style={styles.followButtonProfile} onPress={() => {
                viewJobOffer(item)}}>
      <Text style={styles.followButtonText}>View</Text>
    </TouchableOpacity>
    </View>
    );
  };

  const filteredUsers = jobOffers.filter(job => {
    const occupation = job.position.toLowerCase();
    const location = job.loc.toLowerCase();
    return (!selectedCategory || occupation.includes(selectedCategory.toLowerCase()))
      && (!selectedLocation || location.includes(selectedLocation.toLowerCase()));
  });
  
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for job offer"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.filterContainer}>
      <Picker
      selectedValue={selectedCategory}
      style={styles.filterPicker}
      onValueChange={(itemValue) => setSelectedCategory(itemValue)}
    >
      <Picker.Item label="Select Category" value="" />
      {positions.map((position) => (
        <Picker.Item style={styles.pickerItem} key={position} label={position} value={position} />
      ))}
    </Picker>

      <Picker
      selectedValue={selectedLocation}
      style={styles.filterPicker}
      onValueChange={(itemValue) => setSelectedLocation(itemValue)}
    >
      <Picker.Item label="Select a location" value="" />
      {locations.map((location) => (
        <Picker.Item style={styles.pickerItem} key={location} label={location} value={location} />
      ))}
    </Picker>
  {modalRender(job)}
</View>
      <FlatList
        data={filteredUsers}
        keyExtractor={item => item.key.toString()}
        renderItem={renderItem}
      />
    </View>
    
  );
};

export default JobOfferScreen

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
            backgroundColor: "black",
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
            fontSize: 14,
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
            marginBottom: 5,
            fontWeight: "bold",
          },
          modalBodyMessage: {
            fontSize: 18,
            marginBottom: 1,
          },
          modalFooterColumn: {
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
          },
          scrollview: {
            maxHeight: 150,
            overflowy: "scroll",
          },

    });