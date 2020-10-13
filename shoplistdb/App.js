import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('shoppingdb.db');

export default function App() {

  const [product, setProduct] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [listItems, setListItems] = React.useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists shoppinglist (id integer primary key not null, product text, amount text);');
    });

    updateList();
  }, []);

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from shoppinglist;', [], (_, { rows }) =>
        setListItems(rows._array)
      );
    });
  }

  const saveItem = () => {
    db.transaction(tx => {
      tx.executeSql('insert into shoppinglist (product, amount) values (?, ?);',
          [product, amount]);
    }, null, updateList
    )
  }

  const deleteItem = (id) => {
    db.transaction(
      tx => {tx.executeSql('delete from shoppinglist where id = ?;', [id]);}, null, updateList)
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
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) =>
          <View style={{borderBottomWidth: 2, borderBottomColor: 'gray', flexDirection: 'row',  justifyContent: 'space-between', marginLeft: 30, marginRight: 30}}>
            <Text>{item.product}, {item.amount}</Text><Text style={{color: 'darkgreen'}} onPress={() => deleteItem(item.id)}>Bought</Text>
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
