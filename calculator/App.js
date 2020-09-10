import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';

export default function App() {
  const [number1, setNumber1] = React.useState("");
  const [number2, setNumber2] = React.useState("");
  const [result, setResult] = React.useState("");
  const [history, setHistory] = React.useState([]);

  const addition = () => {
    let calc = (parseInt(number1) + parseInt(number2));
    let historyString = (number1 + " + " + number2 + " = " + calc);
    setHistory([...history, historyString]);
    setResult(calc);
  }

  const reduction = () => {
    let calc = (parseInt(number1) - parseInt(number2))
    let historyString = (number1 + " - " + number2 + " = " + calc);
    setHistory([...history, historyString]);
    setResult(calc);
  }

  const clearHistory = () => {
    setHistory([]);
    Alert.alert("History deleted!");
  }

  return (
    <View style={styles.container} >
      <View style={styles.textContainer}>
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
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={addition} title="+" />
        <Button onPress={reduction} title="-" />
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={clearHistory} title="Clear History" />
      </View>
      <View style={styles.textContainer}>
        {history.map((historyObject, i) => (
          <Text key={i}>{historyObject}</Text>
        ))}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

//Can't figure out how to add spacing between the buttons but at least everything works
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    justifyContent: 'center'
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 150,
    marginRight: 150,
    margin: 20
  },
});
