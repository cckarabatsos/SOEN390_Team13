import {
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import NewsScreen from './NewsScreen';
import CompanyScreen from './CompanyScreen';
import PeopleScreen from './PeopleScreen';
import JobOfferScreen from './JobOfferScreen';

const Tab = createMaterialTopTabNavigator();

function HomeTabs() {
  const navigation = useNavigation();

  return (
    <Tab.Navigator>
      <Tab.Screen name="News"component={NewsScreen}/>
      <Tab.Screen name="Company" component={CompanyScreen}/>
      <Tab.Screen name="People" component={PeopleScreen} />
      <Tab.Screen name="Jobs" component={JobOfferScreen} />
    </Tab.Navigator>
  );
}

const Home = ({ navigation, route }:any) => {
 
  return (
    <SafeAreaView style={styles.container}>
      <HomeTabs />
    </SafeAreaView>

  );
};

export default Home;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
}});
