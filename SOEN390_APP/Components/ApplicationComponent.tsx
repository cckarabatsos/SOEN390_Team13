import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Button,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Modal,
  FlatList,
  Image,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RemoveApplication } from '../api/userApplicationsApi';

export default function ApplicationsComponent(item:any) {



  const company= item.company
  const type=item.type
  const description=item.description
  const location=item.location
  const duration=item.duration
  const salary=item.salary
  const currentEmail = item.currentEmail
  const companyEmail=item.email
  const postingID=item.postingID
  const jobPosterID=item.jobPosterID
  const userID=item.userID
  //console.log(image);



  const removeApplication = async (userID:string, postingID:string) => {
    await RemoveApplication(userID, postingID);
    item.refreshContacts();
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        
      </View>
      <View style={[styles.column, { flex: 1 }]}>
        <Text style={styles.name}>{company}</Text>
        <Text style={styles.name}>{type}</Text>
        <ScrollView style={{ maxHeight: 100 }}>
          <Text style={styles.job}>{description}</Text>
        </ScrollView>
        <View style={styles.detailsContainer}>
    <Text style={styles.details}>{location}</Text>
    <Text style={styles.details}>{duration}</Text>
    <Text style={styles.details}>{salary}</Text>
  </View>
      </View>
      <TouchableOpacity
            onPress={() => removeApplication(userID, postingID)}
            style={styles.closeButtonContainer}
          >
            <Ionicons name="trash-outline" size={25} color={"red"}></Ionicons>        
          </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    //backgroundColor: '#eeeeee',
    borderColor: "#f1f1f1",
    borderBottomWidth: 1,
    borderTopWidth: 2
  },
  column: {
    marginLeft:10,
    marginVertical:10
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 25,
    marginRight:10
    
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  details: {
    fontSize: 14,
    color: "gray",
    flex: 1,
    textAlign: "center",
    marginRight: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  job: {
    fontSize: 14,
  },
  location: {
    fontSize: 14,
    color: "gray",
  },
  closeButtonContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 20,
    alignItems: 'flex-end'

  },
});
