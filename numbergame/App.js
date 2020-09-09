import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, TextInput, Button } from 'react-native';

export default function App() {

  const [randomNumber, setRandomNumber] = useState(0);
  const [guess, setGuess] = useState("");
  const [output, setOutput] = useState("Guess a number!");
  const [guessIndex, setGuessIndex] = useState(1);

  useEffect(() => {
    getRandomNumber();
  }, [])

  const getRandomNumber = () => {
    setRandomNumber(Math.floor(Math.random() * 100) + 1);
    setGuessIndex(1);
  }

  const getOutput = () => {
    if (randomNumber == parseInt(guess)) {
      setGuessIndex(guessIndex + 1);
      Alert.alert("You win in " + guessIndex + " guesses");
      getRandomNumber();
    } else if (randomNumber < parseInt(guess)) {
      setOutput("You guessed too high")
      setGuessIndex(guessIndex + 1);
    } else {
      setOutput("You guessed too low")
      setGuessIndex(guessIndex + 1);
    }
  }

  return (
    <View style={styles.container}>
      <Text>{output}{randomNumber}</Text>
      <TextInput value={guess} onChangeText={text => setGuess(text)} 
      style={{borderColor: 'black', borderWidth: 1}} keyboardType='number-pad' />
      <Button onPress={getOutput} title="Guess!" />
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
  },
});
