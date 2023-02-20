//import { Component } from "react";
import {StyleSheet,TextInput, View} from 'react-native';


const SearchBox = ({className, placeholder, onChangeHandler}:any) =>(
    <View style={styles.container}>
            <TextInput
                style={styles.searchBox}
                placeholder = {placeholder}
                onChange = {onChangeHandler}
            />
    </View>
)

/* class SearchBox extends Component{
    render(){
        return(
            <input
                className ={`search-box ${this.props.className}`}
                type = 'search'
                placeholder = {this.props.placeholder}
                onChange = {this.props.onChangeHandler}
            />
        )
    }
}
 */

const styles = StyleSheet.create({
    searchBox: {
        borderWidth: 1,
        borderColor: "#b8b8b8",
        padding: 8,
        width: "90%",
        borderRadius: 30,
        backgroundColor: "#d4d4d4",
    },
    container:{
        marginLeft: 16,
        marginTop: 16,
    }
  });
export default SearchBox;

