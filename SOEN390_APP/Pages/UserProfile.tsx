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
import StandaloneRow from '../Components/SwipeList.Component/SwipeListEdit.Component';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from "@react-navigation/native";



const ExpandableComponent = ({item, onClickFunction}:any) => {
    //Custom Component for the Expandable List
    const [layoutHeight, setLayoutHeight] = useState(0);
  
    useEffect(() => {
      if (item.isExpanded) {
        setLayoutHeight(null);
      } else {
        setLayoutHeight(0);
      }
    }, [item.isExpanded]);
  
    if(item.category_name == "Profile" || item.category_name == "Skills"){
    return (
      <View>
        {/*Header of the Expandable List Item*/}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onClickFunction}
          style={styles.header}>
            <Ionicons size={20} name="add-circle"/>
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
          else{
             return (
      <View>
        {/*Header of the Expandable List Item*/}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onClickFunction}
          style={styles.header}>
            <Ionicons size={20} name="add-circle"/>
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
            <StandaloneRow data = {item}/>
          ))}
        </View>
      </View>
    );
          }
  };
  
const UserProfile = ({route}:{route:any}) => {

        let name = route.params.username
        let password = route.params.password
        if(password==null)
          password="<EMPTY>"
        let email = route.params.email
      
        const CONTENT = [
          {
              isExpanded: false,
              category_name: 'Profile',
              subcategory: [
                {key: 1, text: name},
                {key: 3, text: email},
                {key: 4, text: password},
              ],
            },
          {
            isExpanded: false,
            category_name: 'Experience',
            subcategory: [
              {key: 5, text: 'Software Development Engineer'},
              {key: 6, text: 'Backend Engineer Intern'},
            ],
          },
          {
            isExpanded: false,
            category_name: 'Education',
            subcategory: [
              {key: 7, text: 'Concordia University'},
              {key: 8, text: 'Dawson College'},
            ],
          },
          {
              isExpanded: false,
              category_name: 'Skills',
              subcategory: [
                {key: 9, text: 'Java'},
                {key: 10, text: 'Python'},
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
    
  return (
      <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
            <View style={{backgroundColor: "rgb(208, 164, 245)", height: 225, width: '100%',padding: 10}}>
                <Image
                style={styles.logo}
                source={require('../Components/Images/logInBackground.png')}
                />
                <Text style={styles.titleText}> {name} </Text>
                <Text style={styles.textSmall}> Software Engineering Student </Text>
                <Text style={styles.textSmall}> Montreal, Quebec </Text>
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

