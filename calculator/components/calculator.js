import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';

export default function Calculator({ navigation }) {

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

  //Clear history is work in progress
  /*const clearHistory = () => {
    setHistory([]);
    Alert.alert("History deleted!");
  }*/

  return (
      <View style={styles.container}>
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
            <Button onPress={addition} title="  +  " />
            <Button onPress={reduction} title="  -  " />
            <Button 
                onPress={() => navigation.navigate('History', {history: history})}
                title="History"
            />
        </View>
        
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
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginLeft: 100,
      marginRight: 100,
      marginTop: 10,
      paddingLeft: 15,
      paddingRight: 15
    },
});