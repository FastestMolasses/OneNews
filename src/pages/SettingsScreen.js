import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

export default class SettingsScreen extends React.Component
{
    render()
    {
        return (
            <SafeAreaView style={styles.container}>
                <Text>
                    Settings man...
                </Text>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
