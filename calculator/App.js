import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {
  const [number1, setNumber1] = React.useState("");
  const [number2, setNumber2] = React.useState("");
  const [result, setResult] = React.useState(0);

  const addition = () => {
    setResult(parseInt(number1) + parseInt(number2))
  }

  const reduction = () => {
    setResult(parseInt(number1) - parseInt(number2))
  }

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <TextInput 
        style={{width:100, borderColor: 'black', borderWidth: 1}} 
        value={number1} 
        keyboardType = 'numeric' 
        onChangeText={text => setNumber1(text)} 
      />
      <TextInput 
        style={{width:100, borderColor: 'black', borderWidth: 1}} 
        value={number2} 
        keyboardType = 'numeric' 
        onChangeText={text => setNumber2(text)} 
      />
      <View style={styles.buttons}>
        <Button onPress={addition} title="+" />
        <Button onPress={reduction} title="-" />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

//Can't figure out how to add spacing between the buttons but at least everything works
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
