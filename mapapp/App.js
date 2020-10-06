import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function App() {
  const [coords, setCoords] = useState({latitude: 60.200692, longitude: 24.934302, latitudeDelta: 0.0322, longitudeDelta: 0.0221});
  const [address, setAddress] = useState("");
  const key = "rgrpE6MzhVSEG6rdZVdrUhZe7jbLnbAT";

  const getCoords = () => {
    fetch(`http://open.mapquestapi.com/geocoding/v1/address?key=${key}&location=${address}`)
    .then(result => result.json())
    .then(data => 
      setCoords(
        {...coords, 
          latitude: data.results[0].locations[0].latLng.lat, 
          longitude: data.results[0].locations[0].latLng.lng
        }))
    .catch(err => Alert.alert(err));
  }

  return (
    <View style={{flex: 1}}>
      <MapView
        style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          region = {{
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: coords.latitudeDelta,
            longitudeDelta: coords.longitudeDelta,
          }}
      >
        <Marker
          coordinate={{
            latitude: coords.latitude,
            longitude: coords.longitude
          }}
          title={address}
        />
      </MapView>
      <View style={{flexDirection: 'row'}}>
        <TextInput 
          style={{width: 300, borderColor: 'blue', borderWidth: 1, alignItems: 'center', fontSize: 15, marginLeft: 10}}
          value={address}
          keyboardType='ascii-capable'
          onChangeText={text => setAddress(text)}
        />
        <Button style={{width: 120, alignItems: 'center'}} onPress={getCoords} title='  Search  ' />
      </View>
        
      <StatusBar style="auto" />
    </View>
  );
}

