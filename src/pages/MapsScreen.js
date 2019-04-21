import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default class MapsScreen extends React.Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <MapView provider={PROVIDER_GOOGLE} />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
