import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';

export default function App() {
  const [list, setList] = React.useState([]);
  const [newItem, setNewItem] = React.useState("");

  const addItem = () => {
      setList([...list, newItem]);
  }

  const clearList = () => {
    setList([]);
    Alert.alert("Shopping list cleared!");
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <TextInput
          style={{width:200, borderColor: 'black', borderWidth: 1}}
          value={newItem}
          keyboardType = "ascii-capable"
          onChangeText={text => setNewItem(text)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={addItem} title="Add Item"></Button>
        <Button onPress={clearList} title="Clear List"></Button>
      </View>
      <View style={styles.textContainer}>
        <Text>Shopping List</Text>
        {list.map((listItem, i) => (
          <Text key={i}>{listItem}</Text>
        ))}
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
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 20,
    marginLeft: 100,
    marginRight: 100
  }
});
