import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
} from 'react-native';
import React from 'react'
import Basic from '../Components/SwipeList.Component/SwipeListBasic.Component';
import StandaloneRow from '../Components/SwipeList.Component/SwipeListEdit.Component';

const UserProfile = () => {

    const firstName = {key: 1, text: 'First Name'}
    const lastName = {key: 1, text: 'Last Name'}
    const email = {key: 1, text: 'Email'}
    const password = {key: 1, text: 'Password'}
    const file = {key: 1, text: 'Saved File'}
 
 
  return (
    <View style={styles.container}>
        <Basic data = {firstName}/>
        <Basic data = {lastName}/>
        <Basic data = {email}/>
        <Basic data = {password}/>
        <StandaloneRow data = {file} />
    </View>
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
    },
})