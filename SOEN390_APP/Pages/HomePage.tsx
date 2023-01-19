import React, { Key, useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';



class ajob {
    title: String;
    location: String;
    company: String;
    id: number;

    constructor(title: String, company: String,location: String,id:number) {
      this.title = title;
      this.location = location;
      this.company = company;
      this.id = id;
    }
  }
  var job1= new ajob("softdev",'google','california',0)
  var job2= new ajob("softdev",'microsoft','california',1)
  var job3= new ajob("softdev",'Discord','california',2)

  var list:ajob[] =[]
  list.push(job1)
  list.push(job2)
  list.push(job3)

  

const Home = () => {
  const [jobQuery, setJobQuery] = useState('');
  const [jobs, setJobs] = useState<ajob[]>([]);

 

  const handleSearch = async () => {
    console.log("hello")
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for jobs"
          value={jobQuery}
          onChangeText={setJobQuery}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text>Search!</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.resultsContainer}>
        {list.map(job => (
          <View key={job.id} style={styles.jobContainer}>
            <Text style={styles.jobTitle}>{job.title}</Text>
            <Text style={styles.jobCompany}>{job.company}</Text>
            <Text style={styles.jobLocation}>{job.location}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Home;




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
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
    width: '100%',
    margin: 10,
  },
  jobContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  jobCompany: {
    fontSize: 16,
    color: 'grey',
  },
  jobLocation: {
    fontSize: 14,
  },
});
