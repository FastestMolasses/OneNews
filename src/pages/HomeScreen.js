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
        this.getNewsStories();
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
        // let data = []
        fetch('http://onenews.pythonanywhere.com/getStories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: undefined,
        })
            .then(response => {
                return response.json();
            })
            .then(responseData => {
                this.setState({ newsStories: responseData });
                return responseData;
            })
            .done();
        return;
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
