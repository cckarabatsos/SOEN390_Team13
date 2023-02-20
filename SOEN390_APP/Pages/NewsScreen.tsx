import React, { Key, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import axios from "axios";
import Article from "../Components/Article";
import SearchBox from "./../Components/SearchBox";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

interface IArticle {
  urlToImage: string;
  title: string;
  description: string;
  author: string;
  publishedAt: string;
  source: {
    name: string;
  };
  url: string;
}

interface INewsResponse {
  articles: IArticle[];
}

interface IProps {
  navigation: any;
  route: any;
}


const Home: React.FC<IProps> = ({ navigation, route }) => {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [search, setSearchField] = useState("");
  const [filteredArticles, setfilteredArticles] = useState(articles);

  const getNews = () => {
    axios
      .get<INewsResponse>(
        "https://newsapi.org/v2/everything?q=jobs&apiKey=2ddd6cf7107f41b59e325fdebe07d04c",
        {

        }
      )
      .then((response) => {
        setArticles(response.data.articles);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    const newFilteredArticles = articles.filter((articles) => {
      return articles.title.toLowerCase().includes(search);
    });
    setfilteredArticles(newFilteredArticles);
  }, [articles, search]);

  const onSearchChange = (event: any) => {
    const searchFieldString = event.nativeEvent.text.toLowerCase();
    setSearchField(searchFieldString);
  };

  useEffect(() => {
    getNews();
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <View>
      <SearchBox
        onChangeHandler={onSearchChange}
        placeholder="Search Articles"
      />
      </View>
      <FlatList
        data={filteredArticles}
        renderItem={({ item }) => (
          <Article
            urlToImage={item.urlToImage}
            title={item.title}
            description={item.description}
            author={item.author}
            publishedAt={item.publishedAt}
            sourceName={item.source.name}
          />
        )}
        keyExtractor={(item) => item.title}
      />
    </SafeAreaView>

  );
};

export default Home;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
},
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  searchButton: {
    padding: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
  resultsContainer: {
    flex: 1,
    width: "100%",
    margin: 10,
  },
  jobContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  jobCompany: {
    fontSize: 16,
    color: "grey",
  },
  jobLocation: {
    fontSize: 14,
  },
  button: {
    margin: 9,
    marginLeft: 20,
    backgroundColor: "#0077B5",
    padding: 12,
    alignItems: "center",
    marginTop: 16,
    width: "60%",
    borderRadius: 120,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
});
