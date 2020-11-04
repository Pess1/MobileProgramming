import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, Button } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {
  const [contactList, setContactList] = React.useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
      });
      process.stdout.write(JSON.stringify(data) + '\n');
      if (data.length > 0) {
        setContactList(data)
      }
    }
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 3,
          width: "90%",
          backgroundColor: "#fff",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList 
        style={{marginLeft: 10, marginTop: 20, paddingTop: 20, marginBottom: 20}}
        keyExtractor={item => item.lookupKey.toString()}
        renderItem={({item}) => 
          <View style={{borderBottomWidth: 2, borderBottomColor: 'gray', flexDirection: 'row',  justifyContent: 'space-between', marginLeft: 30, marginRight: 30}}>
            <Text>
              {item.name}: {item.phoneNumbers[0].number}
            </Text>
          </View>
        }
        data={contactList}
        ItemSeparatorComponent={listSeparator}
      />
      <Button onPress={getContacts} title='   Get Contacts   ' />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 40
  },
});
