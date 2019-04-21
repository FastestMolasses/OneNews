import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions } from 'react-native';

import AppStyle from '../styles/AppStyle';
import CardList from '../components/CardList';
import BigButton from '../components/BigButton';
import SmallButton from '../components/SmallButton';

export default class HomeScreen extends React.Component {
    constructor() {
        super();

        this.state = {
            newsStories: [],
        };
    }

    componentWillMount() {
        // Update news stories
        this.setState({
            newsStories: this.getNewsStories(),
        });
    }

    getNewsStories = () => {
        // TODO: FETCH FOR NEW STORIES HERE
        return [
            {
                title: 'Sun, Apr 21',
                data: [
                    {
                        category: 'Important',
                        title: 'Notre Dame Cathedral on Fire',
                    },
                    {
                        category: 'World News',
                        title: 'Enhance your artistic skills',
                        previewText:
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
                        textData:
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
                        reportedCount: '36,263',
                    },
                    {
                        category: 'World News',
                        title: 'Enhance your artistic skills',
                        previewText:
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
                        textData:
                            'Lorem ipsum dolor sit, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
                        reportedCount: '7,810',
                    },
                    {
                        category: 'World News',
                        title: 'Enhance your artistic skills',
                        previewText:
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
                        textData:
                            'dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
                        reportedCount: '6,208',
                    },
                    {
                        category: 'World News',
                        title: 'Enhance your artistic skills',
                        previewText:
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
                        textData:
                            'dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
                        reportedCount: '10,203',
                    },
                ],
            },
            {
                title: 'Sat, Apr 20',
                data: [null],
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

        console.log(this.state.newsStories[0]);

        return (
            <View style={{ flex: 1 }}>
                <CardList
                    ref={list => (this.list = list)}
                    data={this.state.newsStories}
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
                                {this.state.newsStories[0].data[index].textData}
                            </Text>
                        </View>
                    )}
                />

                <SmallButton onPress={() => {}} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
