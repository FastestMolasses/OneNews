import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

import SmallButton from '../components/SmallButton';

export default class HomeScreen extends React.Component
{
    render()
    {
        return (
            <SafeAreaView style={styles.container}>
                <Text>
                    Hello world.
                </Text>
                <SmallButton text={'New'} />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
