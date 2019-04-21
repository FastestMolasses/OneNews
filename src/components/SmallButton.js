import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

import AppStyle from '../styles/AppStyle';

export default (SmallButton = ({ text }) => {
    return (
        <TouchableOpacity style={styles.container}>
            <Text style={styles.textStyle}>{text}</Text>
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        right: 25,
        bottom: 25,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: AppStyle.blue,
        borderRadius: 30,
        height: 60,
        width: 60,
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
});
