import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions } from 'react-native';

import CARDS from '../../cards';
import CardList from '../components/CardList';
import BigButton from '../components/BigButton';
import SmallButton from '../components/SmallButton';

const now = new Date();

export default class HomeScreen extends React.Component {
    render() {
        return (
            <CardList
                listProps={{
                    // Header
                    ListHeaderComponent: () => (
                        <View style={{ padding: 16, paddingBottom: 0 }}>
                            <Text
                                style={{
                                    fontSize: 13,
                                    color: 'rgba(0, 0, 0, 0.5)',
                                }}
                            >
                                {now.toDateString()}
                            </Text>
                            <Text style={{ fontSize: 32, fontWeight: 'bold' }}>
                                Featured
                            </Text>
                        </View>
                    ),
                }}
                data={CARDS}
                renderItem={({ item }) => {
                    return item.renderItem({ item });
                }}
                renderDetails={index => (
                    <View
                        style={{ paddingVertical: 30, paddingHorizontal: 16, flex: 1,}}
                    >
                        <Text
                            style={{
                                color: 'rgba(0, 0, 0, 0.7)',
                                fontSize: 18,
                            }}
                        >
                            {CARDS[index].textData}
                        </Text>
                    </View>
                )}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
