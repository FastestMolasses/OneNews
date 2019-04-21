import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    AsyncStorage,
} from 'react-native';

export default class SettingsScreen extends React.Component {
    settingsItems = () => {
        return [
            {
                name: 'Edit Name',
                icon: require('../img/Edit_icon.png'),
            },
            {
                name: 'Invite Friends',
                icon: require('../img/Friends_icon.png'),
            },
            {
                name: 'Notifications',
                icon: require('../img/Notification_icon.png'),
            },
            {
                name: 'Contact Support',
                icon: require('../img/Phone_icon.png'),
            },
            {
                name: 'About',
                icon: require('../img/Info_icon.png'),
            },
            {
                name: 'Sign Out',
                icon: require('../img/Logout_icon.png'),
            },
        ];
    };

    renderSettingsItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 10,
                }}
                onPress={() => {}}
            >
                <Image source={item.icon} style={styles.icon} />
                <Text style={styles.settingsText}>{item.name}</Text>
            </TouchableOpacity>
        );
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Image
                        source={require('../img/TestUserPic.png')}
                        style={styles.profilePicture}
                    />
                    <Text style={styles.nameText}>Abe M.</Text>
                </View>
                <FlatList
                    style={{
                        flex: 1,
                        paddingHorizontal: 22,
                        overflow: 'visible',
                    }}
                    data={this.settingsItems()}
                    renderItem={this.renderSettingsItem}
                    keyExtractor={(item, index) => index.toString()}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    nameText: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
        marginTop: 10,
    },
    icon: {
        width: 25,
        height: 25,
        tintColor: 'black',
    },
    settingsText: {
        marginLeft: 10,
        fontSize: 18,
    },
});
