import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Header, Icon, Input, Button } from 'react-native-elements';

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
      <Header
        leftComponent={{ icon: 'shopping-cart', color: 'pink'}}
        centerComponent={{ text: ' SHOPPING LIST ', style: {color: 'white'}}}
      />
      <FlatList 
        style={{marginLeft: 10, marginTop: 30}}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) =>
          <View style={styles.rows}>
            <Text>{item.product}, {item.amount}</Text><Icon type='material' name='delete' reverse color='pink' onPress={() => deleteItem(item.id)}/>
          </View>}
        data={listItems}
        ItemSeparatorComponent={listSeparator}
      />
      <View style={styles.inputs}>
        <Input 
          style={{width: 200, marginBottom: 10}} 
          placeholder='Item'
          label='Product'
          onChangeText={text => setProduct(text)} 
          value={product} />
        <Input 
          style={{width: 200, marginBottom: 10}} 
          placeholder='Amount'
          label='Amount'
          onChangeText={text => setAmount(text)} 
          value={amount} />
        <Button 
          raised 
          icon={<Icon name='add-shopping-cart' color='white'/>} 
          onPress={saveItem} 
          title='   SAVE   ' 
          buttonStyle={{backgroundColor: 'green'}}/>
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
  },
  inputs: {
    alignItems: 'center',
    marginBottom: 10
  },
  rows: {
    borderBottomWidth: 2, 
    borderBottomColor: 'gray', 
    flexDirection: 'row',  
    justifyContent: 'space-between', 
    marginLeft: 30, 
    marginRight: 30, 
    alignItems: 'center'
  }
});