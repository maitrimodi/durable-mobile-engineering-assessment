import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Linking, ActivityIndicator } from 'react-native';
import useGithub from './hooks/useGithub';
import {variables} from './Utils/constants';
import moment from 'moment';
import { Formik } from 'formik';

export default function App() {
  const { isFirstFetch, isFetching, repositories, searchRepositories } = useGithub();

  const Item = ({item}) => (
    <TouchableOpacity style={styles.item} onPress={()=>{
      Linking.openURL(item.html_url)
    }}>
      <Text style={[styles.title, styles.bold]}>{item.name}</Text>
      <Text style={styles.description}>{item.description || "No description available"}</Text>
      <View style={styles.githubActions}>
        <View style={styles.badgeContainer}>
          <Text style={[styles.updatedText, styles.badge]}>Javascript</Text>
        </View>
        <Text style={styles.updatedText}>{"Updated " + moment(new Date(item.updated_at)).format("MMM DD, YYYY")}</Text>
      </View>
    </TouchableOpacity>
  );
  
  const renderItem = ({ item }) => (
    <Item item={item} />
  );
  
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
      <Formik
        initialValues={{ searchText: '' }}
        onSubmit={values => searchRepositories(values.searchText)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search GitHub"
            value={values.searchText}
            onChangeText={handleChange('searchText')}
            onBlur={handleBlur('searchText')}
            onSubmitEditing={handleSubmit}
          />
          <TouchableOpacity style={styles.searchBtn} onPress={handleSubmit}>
            <Text style={styles.btnText}>Search</Text>
          </TouchableOpacity>
        </View>
        )}
        </Formik>
        {!isFetching ? <View style={styles.listContainer}>
            {repositories.length ? <FlatList
              data={repositories}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              style={styles.list}
            /> 
          : <View style={styles.resultTextContainer}>
              <Text style={styles.resultText}>{isFirstFetch ? "Search public GitHub repositories" : "No results found!"}</Text>
          </View>}
        </View> 
        : <ActivityIndicator size="large" style={styles.activityIndicator}/>} 
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    width:"80%",
    borderWidth: 1,
    color: variables.colors.darkGrey,
    borderColor: variables.colors.grey,
    backgroundColor: variables.colors.secondary,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    fontSize: 16
  },
  searchBarContainer: {
    display:"flex", 
    flexDirection:"row"
  },
  searchBtn: { 
    justifyContent: "center", 
    backgroundColor: variables.colors.primary, 
    borderRadius: 5, 
    paddingVertical: 5, 
    paddingHorizontal: 10
  },
  btnText: {
    color:"#fff"
  },
  item: {
    borderColor: variables.colors.grey,
    borderWidth: 1,
    padding: 10,
    flex: 1,
    backgroundColor: '#f6f8fa',
    marginVertical: 5,
    color: variables.colors.primary,
    borderRadius: 5,
  },
  listContainer: {
    width: "100%",
    marginTop: 5
  },
  title: {
    lineHeight: 20,
    fontSize: 15,
    fontColor: variables.colors.primary
  },
  description: {
    lineHeight: 20,
    fontSize: 13,
    fontColor: variables.colors.darkGrey
  },
  updatedText: {
    lineHeight: 15,
    fontSize: 11,
    fontColor: variables.colors.darkGrey
  },
  bold: {
    fontWeight: "700"
  },
  githubActions: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 5
  },
  badgeContainer: {
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    marginRight: 10
  },
  badge: {
    padding: 5
  },
  userName: {
    marginRight: 10,
    fontSize: 11,
    fontColor: variables.colors.darkGrey
  },
  resultTextContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "90%",
  },
  resultText: {
    color: variables.colors.darkGrey,
  },
  activityIndicator: {
    marginTop: 200
  }
});
