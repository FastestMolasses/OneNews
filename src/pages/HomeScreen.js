import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    Dimensions,
    Modal,
    TouchableHighlight,
    TextInput,
} from 'react-native';

import AppStyle from '../styles/AppStyle';
import CardList from '../components/CardList';
import BigButton from '../components/BigButton';
import SmallButton from '../components/SmallButton';
import CloseButton from '../components/CardList/components/CloseButton';

export default class HomeScreen extends React.Component {
    constructor() {
        super();

        this.state = {
            newsStories: [],
            modalVisible: false,
            inputText: '',
            charLeft: 240,
        };
    }

    componentWillMount() {
        // Update news stories
        this.setState({
            newsStories: this.getNewsStories(),
        });
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    newPost = () => {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}
            >
                <View style={styles.modal}>
                    <CloseButton
                        onPress={() => {
                            this.setModalVisible(false);
                        }}
                    />
                    <Text
                        style={{
                            fontSize: 26,
                            color: AppStyle.gunmetal,
                            fontWeight: 'bold',
                            marginLeft: 20,
                            marginTop: 15,
                        }}
                    >
                        Report a new story
                    </Text>
                    <Text style={styles.textLengthCounter}>
                        {this.state.charLeft} characters
                    </Text>
                    <TextInput
                        style={styles.textInput}
                        multiline={true}
                        onChangeText={inputText => {
                            let l = 240 - this.state.inputText.length;
                            this.setState({
                                inputText: inputText,
                                charLeft: l,
                            });
                        }}
                        value={this.state.inputText}
                        placeholder={"Describe what's happening..."}
                        placeholderTextColor={AppStyle.grey}
                    />
                    <View>
                        <BigButton
                            text={'Post Story'}
                            onPress={() => {
                                this.setModalVisible(false);
                            }}
                        />
                    </View>
                </View>
            </Modal>
        );
    };

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
                                {'\t'}
                                {this.state.newsStories[0].data[index].textData}
                            </Text>
                        </View>
                    )}
                />

                <SmallButton
                    onPress={() => {
                        this.setModalVisible(true);
                    }}
                />

                {this.newPost()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    modal: {
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 50,
        backgroundColor: '#f2f2f2',
    },
    textLengthCounter: {
        fontSize: 16,
        marginTop: 20,
        marginLeft: 25,
        color: AppStyle.grey,
    },
    textInput: {
        // borderColor: 'black',
        // borderWidth: 1,
        borderRadius: 20,
        backgroundColor: '#f8f8f8',
        padding: 20,
        paddingTop: 20,
        fontSize: 18,
        marginHorizontal: 20,
        marginTop: 10,
        height: 270,
    },
});
