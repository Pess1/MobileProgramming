import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Icon, Button, Input, ListItem } from 'react-native-elements';

export default function Maplocation ({route, navigation}) {
    const { address } = route.params;
    const key = 'rgrpE6MzhVSEG6rdZVdrUhZe7jbLnbAT';
    const [coords, setCoords] = React.useState({latitude: 60.200692, longitude: 24.934302, latitudeDelta: 0.0322, longitudeDelta: 0.0221});
    console.log(address)

    const getCoords = (addressString) => {
        fetch(`http://open.mapquestapi.com/geocoding/v1/address?key=${key}&location=${address}`)
        .then(result => result.json())
        .then(data => 
          setCoords(
            {...coords, 
              latitude: data.results[0].locations[0].latLng.lat, 
              longitude: data.results[0].locations[0].latLng.lng
            }))
        .catch(err => console.error(err));
    }

    return (
        <View style={styles.container}>
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
                />
            </MapView>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Button 
                    icon={<Icon name='pin-drop' color='white'/>}
                    onPress={getCoords}
                    title='   SHOW   '
                    buttonStyle={{backgroundColor: 'blue', width: 400}}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});