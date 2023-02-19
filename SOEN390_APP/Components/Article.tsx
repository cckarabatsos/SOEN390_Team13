import React from "react";
import {View,StyleSheet,Text,Pressable,Image, TouchableOpacity} from "react-native";
import moment from "moment";
import * as WebBrowser from 'expo-web-browser';
import { Button } from "react-native-paper";

const Article = (props:any) => {

    const goToSource = () =>{
        
    }

    const handleConnect = () =>{
       
    }

    return(
        <View style={styles.container}>
        <Pressable onPress={goToSource}>
            {/* image */}
            <Image source={{
                uri: props.urlToImage
            }}
            style={styles.image}
            />

            <View style={{padding: 20}}>


        {/*    title */}
            <Text style={styles.title}>{props.title}</Text>

        {/*    description */}
            <Text style={styles.description} numberOfLines={3}>
                {props.description}
            </Text>

            <View style={styles.data}>
                <Text style={styles.heading}>Author: <Text style={styles.author}>{props.author}</Text></Text>
                <Text style={styles.date}>{moment(props.publishedAt).format("MMM Do YY") }</Text>
            </View>

        {/*     source */}
            </View>
                
        </Pressable>
        </View>
    )
}
//<TouchableOpacity style={styles.button}> </TouchableOpacity>
export default Article;

const styles = StyleSheet.create({
    container:{
        width: "90%",
        alignSelf: "center",
        borderRadius: 40,
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 8 },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 7,
        backgroundColor: '#ebe9e9',
        marginTop: 20
    },
    image:{
        height: 200,
        width: "100%",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40
    },
    title:{
        fontSize: 18,
        fontWeight: "600",
        marginTop: 10
    },
    description:{
        fontSize: 16,
        fontWeight: "400",
        marginTop: 10
    },
    data:{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10
    },
    heading:{

    },
    author:{
        fontWeight: "bold",
        fontSize: 15
    },
    date:{
        fontWeight: "bold",
        color: "#e63946",
        fontSize: 15
    },
    source:{
        color: "#e63946",
        fontWeight: "bold",
        fontSize: 18
    },
    button:{
        marginLeft: 1,
        backgroundColor: "#0077B5",
        padding: 12,
        alignItems: "center",
        width: "60%",
        borderRadius: 120,
    },
    buttonText:{
        color: "#fff",
        fontWeight: "bold",
        fontSize: 15,
    },
})