import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button, Image } from 'react-native';

export default function Recipefinder() {
    const [keyword, setKeyword] = React.useState("");
    const [recipes, setRecipes] = React.useState([]);

    const getRecipes = () => {
        fetch(`http://www.recipepuppy.com/api/?i=${keyword}`)
        .then(response => response.json())
        .then(responseData => setRecipes(responseData.results))
        .catch(err => console.error(err))
    }

    const listItemSeparator = () => {
        return (
            <View style={{margin: 2,
                width: '90%',
                height: 2,
                backgroundColor: '#000000',
                marginLeft: 10}}/>
        )
    }

    return (
        <View>
            <FlatList 
                data={recipes}
                style={styles.list}
                keyExtractor = {item => item.title}
                ItemSeparatorComponent={listItemSeparator}
                renderItem = {({item}) => 
                    <View>
                        <Text>{item.title}</Text>
                        <Image source={{uri: item.thumbnail}} style={styles.image} />
                    </View>
                }
            />
            <TextInput 
                style={{width: 400, borderColor: 'black', borderWidth: 1, alignItems: "center", fontSize: 20}}
                value={keyword}
                keyboardType = 'ascii-capable'
                onChangeText={text => setKeyword(text)}   
            />
            <Button style={{width: 400, alignItems: "center"}} onPress={getRecipes} title = " Get Recipes "/>   
        </View>
    )
}

const styles = StyleSheet.create({
    list: {
      marginTop: 40,
      marginLeft: 30,
    },
    image: {
        width: 60,
        height: 60
    }
});