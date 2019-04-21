import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions } from 'react-native';

import CARDS from '../../cards';
import AppStyle from '../styles/AppStyle';
import CardList from '../components/CardList';
import BigButton from '../components/BigButton';
import SmallButton from '../components/SmallButton';

export default class HomeScreen extends React.Component {
    getNewsStories = () => {
        // TODO: FETCH FOR NEW STORIES HERE
        return [
            {
                title: 'Sun, Apr 21',
                data: [
                    {
                        category: 'World News',
                        title: 'Enhance your artistic skills',
                        previewText:
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
                        textData:
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
                    },
                    {
                        category: 'World News',
                        title: 'Enhance your artistic skills',
                        previewText:
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
                        textData:
                            'Lorem ipsum dolor sit, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
                    },
                    {
                        category: 'World News',
                        title: 'Enhance your artistic skills',
                        previewText:
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
                        textData:
                            'dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
                    },
                ],
            },
            {
                title: 'Sat, Apr 20',
                data: [
                    {
                        category: 'World News',
                        title: 'Enhance your artistic skills',
                        previewText:
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
                        textData:
                            'ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
                    },
                ],
            },
        ];
    };

    render() {
        let date = new Date();
        this.curDate = date.toLocaleDateString('en-US', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
        });

        return (
            <CardList
                // listProps={{
                //     ListHeaderComponent: () => (
                        
                //     ),
                // }}
                data={this.getNewsStories()}
                renderItem={({ item }) => {
                    return item.renderItem({ item });
                }}
                renderDetails={index => (
                    <View
                        style={{
                            paddingVertical: 30,
                            paddingHorizontal: 16,
                            flex: 1,
                        }}
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
