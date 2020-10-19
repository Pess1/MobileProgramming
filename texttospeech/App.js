import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import * as Speech from 'expo-speech';

export default function App() {
  const [input, setInput] = React.useState("");

  const speak = async () => {
    let output = input;
    Speech.speak(output, {voice:'en-US-SMTf00', language: 'en', pitch: 0.8, rate: 1.0});
  }

  const stop = () => {
    Speech.stop();
  }
  
  return (
    <View style={styles.container}>
      <TextInput 
        style={{borderBottomColor: 'gray', borderBottomWidth: 2, margin: 20, padding: 10}}
        placeholder='Input'
        onChangeText={text => setInput(text)}
        value={input}
      />
      <View style={{flexDirection: 'row'}}>
        <Button style={{margin: 10}} onPress={speak} title='   Speak   '/>
        <Button style={{margin: 10}} color='#FF0000' onPress={stop} title='   Stop   '/>
      </View>
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
