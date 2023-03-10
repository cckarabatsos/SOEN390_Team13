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

function HomeTabs({route}:{route:any}) {
  const navigation = useNavigation();

  return (
    <Tab.Navigator>
      <Tab.Screen name="News"component={NewsScreen}/>
      <Tab.Screen name="Company" initialParams={{username: route.params.username, email:route.params.email, password:route.params.password}} component={CompanyScreen} />
      <Tab.Screen name="People" initialParams={{username: route.params.username, email:route.params.email, password:route.params.password}} component={PeopleScreen} />
      <Tab.Screen name="Jobs" component={JobOfferScreen} />
    </Tab.Navigator>
  );
}

const Home = ({ navigation, route}: { navigation: any, route:any }) => {
 
  return (
    <SafeAreaView style={styles.container}>
      <HomeTabs route={route} />
    </SafeAreaView>

  );
};

export default Home;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
}});
