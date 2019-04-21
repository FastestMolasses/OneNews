import React from 'react';
import { View } from 'react-native';

import Router from './Router';

// watchman watch-del-all
// rm -rf node_modules && npm install
// npm start -- --reset-cache
// rm -rf /tmp/haste-map-react-native-packager-*

export default class App extends React.Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Router />
            </View>
        );
    }
}
