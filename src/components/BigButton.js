import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

import AppStyle from '../styles/AppStyle';

export default class BigButton extends React.Component
{
    render()
    {
        return (
            <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
                <Text style={styles.text}>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 75,
        width: '70%',
        alignSelf: 'center',
        backgroundColor: AppStyle.blue,
        paddingVertical: 15,
        borderRadius: 50,
    },
    text: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
