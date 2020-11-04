import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon, Button, Input, ListItem } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';
import { FlatList } from 'react-native-gesture-handler';

const db = SQLite.openDatabase('locationdb.db');

export default function Myplaces ({navigation}) {
    const [address, setAddress] = useState('');
    const [listItems, setListItems] = useState([]);

    useEffect(() => {
        console.log("myplaces use effect")
        db.transaction(tx => {
            tx.executeSql('create table if not exists locations (id integer primary key not null, address text);');
        });
        updateList();
    }, [])

    const updateList = () => {
        db.transaction(tx => {
            tx.executeSql('select * from locations;', [], (_, { rows }) =>
                setListItems(rows._array)
            );
        });
    };

    const save = () => {
        db.transaction(
            tx => {tx.executeSql('insert into locations (address) values (?);', [address]);
        }, null, updateList
        )
    }

    const deleteItem = (id) => {
        db.transaction(
            tx => {tx.executeSql('delete from locations whhere id = ?;', [id]);}, null, updateList
        )
    }

    renderItem = ({ item }) => (
        <ListItem bottomDivider>
            <ListItem.Content>
                <ListItem.Title>{item.address}</ListItem.Title>
                <ListItem.Subtitle>Press to show on map. Press long to delete</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )

    return (
        <View style = {styles.container}>
            <View>
                <Input 
                    style={{width: 200, marginBottom: 10, marginTop: 10}} 
                    placeholder='Address'
                    label='Write an address'
                    onChangeText={text => setAddress(text)} 
                    value={address}
                />
                <Button 
                    icon={<Icon name='save' color='white'/>}
                    onPress={save}
                    title='   SAVE   '
                    buttonStyle={{backgroundColor: 'blue'}}
                />
            </View>
            <FlatList
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
                data={listItems}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: 100,
      justifyContent: 'center'
    },
    textContainer: {
      alignItems: 'center',
      justifyContent: 'center'
    }
});