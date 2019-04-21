import React from 'react';
import { StyleSheet, TouchableHighlight, Image } from 'react-native';

import AppStyle from '../styles/AppStyle';

export default (SmallButton = ({ text, onPress }) => {
    return (
        <TouchableHighlight style={styles.container} onPress={onPress} underlayColor='#0088d8'>
            <Image style={styles.image} source={require('../img/pencil.png')} />
        </TouchableHighlight>
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
        shadowColor: 'rgb(0, 0, 0)',
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowRadius: 5,
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    image: {
        width: 25,
        height: 25,
        tintColor: 'white',
        // justifyContent: 'center',
        // alignContent: 'center',
        alignSelf: 'center',
    }
});
