import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';

export default function History({ route, navigation }) {
    const { history } = route.params;

    return (
        <View>
            <View style={styles.textContainer}>
                <Text>History</Text>
                <Button title="Clear History (Work In Progress)" />
            </View>
            <View style={styles.textContainer}>
                {history.map((historyObject, i) => (
                    <Text key={i}>{historyObject}</Text>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textContainer: {
      alignItems: 'center',
      justifyContent: 'center'
    }
});