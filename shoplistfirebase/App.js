import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import * as firebase from 'firebase';

//Deleted apiKey and messagingSenderId since the database has no restrictions for access
const firebaseConfig = {
  apiKey: "",
  authDomain: "com.haagahelia.fi",
  databaseURL: "https://shoplistwithfb.firebaseio.com",
  projectId: "shoplistwithfb",
  storageBucket: "shoplistwithfb.appspot.com",
  messagingSenderId: ""
};

firebase.initializeApp(firebaseConfig);

export default function App() {

  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState("");
  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    updateList();
  }, [])

  const updateList = () => {
    firebase.database().ref('items/').on('value', snapshot => {
      const data = snapshot.val();
      const prods = Object.values(data);
      setListItems(prods);
    })
  }

  const saveItem = () => {
    firebase.database().ref('items/').push(
      {'product': product, 'amount': amount}
    );
    
    updateList();
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text>Shopping List</Text>
      <FlatList 
        style={{marginLeft: 10}}
        renderItem={({item}) =>
          <View style={{borderBottomWidth: 2, borderBottomColor: 'gray'}}>
            <Text>{item.product}, {item.amount}</Text>
          </View>}
        data={listItems}
        ItemSeparatorComponent={listSeparator}
      />
      <View>
        <TextInput style={{borderBottomColor: 'gray', borderBottomWidth: 2}} placeholder='Item' onChangeText={text => setProduct(text)} value={product} />
        <TextInput style={{borderBottomColor: 'gray', borderBottomWidth: 2}} placeholder='Amount' onChangeText={text => setAmount(text)} value={amount} />
        <Button onPress={saveItem} title='   Save   '/>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    justifyContent: 'center',
    marginTop: 50,
    marginLeft: 30,
    marginRight: 30
  },
});
