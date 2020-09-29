import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import { Picker } from '@react-native-community/picker';

export default function App() {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [input, setInput] = useState("0.00");
  const [currency, setCurrency] = useState("SEK");
  const [displayCurrency, setDisplayCurrency] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    getData();
  }, [])

  const getData = () => {
    fetch("https://api.exchangeratesapi.io/latest")
    .then((response) => response.json())
    .then((data) => {
      setExchangeRates(data.rates);
    })
    .catch((err) => console.error(err));
  }

  const calculations = () => {
    let value = parseFloat(input) * parseFloat(exchangeRates[currency]);
    setOutput(value.toFixed(2));
    setDisplayCurrency(currency);
  }

  return (
    <View style={styles.container}>
      <Image 
        source={{uri:"https://masterinvestor.co.uk/wp-content/uploads/2017/01/euro-1280x720.jpg"}}
        style={{width:150, height:150, margin: 30}}
      />
      <Text>Exhanged value: {output} {displayCurrency}</Text>
      <View style={{flexDirection: 'row', width: 200}}>
        <TextInput style={{fontSize: 20, width: 100}}
          value={input}
          onChangeText={(input) => setInput(input)}
        />
        <Picker style={{width: 105, height: 50}} selectedValue={currency} onValueChange={(itemValue, itemIndex) => setCurrency(itemValue)}>
          {Object.keys(exchangeRates).map((key) => {
            return <Picker.Item label={key} value={key} key={key} />;
          })}
        </Picker>
      </View>
      
      <Button onPress={calculations} title="Calculate" />
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
