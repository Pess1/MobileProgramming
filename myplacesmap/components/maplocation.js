import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Maplocation ({route, navigation}) {
    const { placeaddress } = route.params;

    return (
        <View style={styles.container}>
            <Text>Test</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center'
    }
});