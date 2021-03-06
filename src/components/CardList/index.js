import React from 'react';
import PropTypes from 'prop-types';

import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Animated,
    Easing,
    FlatList,
    SectionList,
    StatusBar,
    Image,
    Dimensions,
} from 'react-native';

import BigButton from '../BigButton';
import AppStyle from '../../styles/AppStyle';
import { Card, CardContent, CloseButton, DetailsContent } from './components';

const { width, height } = Dimensions.get('window');

class CardList extends React.Component {
    state = {
        activeCard: 0,
        scrollEnabled: false,
    };

    cards = {};
    clones = {};
    animated = new Animated.Value(0);
    position = new Animated.ValueXY();
    detailAnimated = new Animated.Value(0);
    dimensions = new Animated.ValueXY({ x: 0, y: 0 });

    oldPosition = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    };

    // activeCard is an int holding the index
    expand = activeCard => () => {
        StatusBar.setHidden(true, 'slide');

        this.cards[activeCard].measure((x, y, width, height, pageX, pageY) => {
            this.oldPosition = {
                x: pageX,
                y: pageY,
                width,
                height,
            };

            this.position.setValue({
                x: pageX,
                y: pageY,
            });

            this.dimensions.setValue({
                x: width,
                y: height,
            });

            this.setState(
                {
                    activeCard,
                    scrollEnabled: true,
                },
                () => {
                    this.ghostView.measure(
                        (dx, dy, dWidth, dHeight, dPageX, dPageY) => {
                            Animated.parallel([
                                Animated.spring(this.position.x, {
                                    toValue: dPageX,
                                    duration: 300,
                                }),
                                Animated.spring(this.position.y, {
                                    // We add 30 so it doesn't go behind the notch
                                    toValue: dPageY + 30,
                                    duration: 300,
                                }),
                                Animated.spring(this.dimensions.x, {
                                    toValue: dWidth,
                                    duration: 300,
                                }),
                                Animated.timing(this.animated, {
                                    toValue: 1,
                                    duration: 300,
                                }),
                                Animated.timing(this.detailAnimated, {
                                    toValue: 1,
                                    delay: 100,
                                    duration: 300,
                                }),
                            ]).start();
                        },
                    );
                },
            );
        });
    };

    shrink = () => {
        this.setState(
            {
                scrollEnabled: false,
            },
            () => {
                Animated.parallel([
                    Animated.timing(this.position.x, {
                        toValue: this.oldPosition.x,
                        duration: 200,
                    }),
                    Animated.timing(this.position.y, {
                        toValue: this.oldPosition.y,
                        easing: Easing.bezier(0.175, 0.885, 0.32, 1.275),
                        duration: 200,
                    }),
                    Animated.timing(this.dimensions.x, {
                        toValue: this.oldPosition.width,
                        duration: 200,
                    }),
                    Animated.timing(this.dimensions.y, {
                        toValue: this.oldPosition.height,
                        duration: 200,
                    }),
                    Animated.timing(this.animated, {
                        toValue: 0,
                        duration: 200,
                    }),
                    Animated.timing(this.detailAnimated, {
                        toValue: 0,
                        duration: 200,
                    }),
                ]).start(() => {
                    StatusBar.setHidden(false, 'slide');

                    this.setState({
                        activeCard: 0,
                    });
                });
            },
        );
    };

    keyExtractor = (item, index) => `item-${index}`;

    renderPreview = (
        { category, title, previewText, reportedCount },
        active,
    ) => {
        return (
            <View
                style={{
                    width: '100%',
                    padding: 16,
                    backgroundColor: 'rgb(255, 255, 255)',
                }}
            >
                <Text
                    style={{
                        fontSize: 12,
                        marginBottom: 5,
                        fontWeight: 'bold',
                        color: 'rgba(0, 0, 0, 0.5)',
                    }}
                >
                    {category}
                </Text>
                <Text
                    style={{
                        fontSize: 26,
                        maxWidth: '60%',
                        fontWeight: 'bold',
                        color: 'rgb(51, 51, 51)',
                    }}
                >
                    {title}
                </Text>
                {active ? null : (
                    <Text
                        style={{
                            fontSize: 18,
                            // maxWidth: '100%',
                            // fontWeight: 'bold',
                            color: 'black',
                        }}
                    >
                        {previewText}
                    </Text>
                )}
                {active ? (
                    <Text style={{color: AppStyle.pink, fontSize: 16,}}>Reported by {reportedCount} people</Text>
                ) : null}
            </View>
        );
    };

    renderItem = ({ item, index }) => {
        if (!item) {
            return (
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 20,
                        fontWeight: 'bold',
                        marginVertical: 15,
                        marginBottom: 60,
                    }}
                >
                    No new stories
                </Text>
            );
        }

        const { activeCard } = this.state;
        // Takes this directly from cards.js
        const { category, title } = item;

        // This cloned element is the preview element
        // The cloned element will be animated while the card opens
        // const element = React.cloneElement(renderItem({ item, index }));
        const element = React.cloneElement(this.renderPreview(item, false));
        const element2 = React.cloneElement(this.renderPreview(item, true));
        this.clones[index + 1] = element2;

        const opacity = this.animated.interpolate({
            inputRange: [0, 0.01, 1],
            outputRange: [1, 0.1, 0.1],
        });

        const customContainerStyle = [];
        if (activeCard) {
            customContainerStyle.push({
                opacity,
            });
        }

        console.log(category);
        if (category === 'Important') {
            return (
                <View style={styles.importantNews}>
                    <Image
                        style={{ width: 40, height: 40 }}
                        source={require('../../img/attention.png')}
                    />
                    <Text style={styles.importantText}>{title}</Text>
                </View>
            );
        }

        return (
            <Card
                ref={instance => {
                    this.cards[index + 1] = instance;
                }}
                onPress={this.expand(index + 1)}
                customContainerStyle={customContainerStyle}
                // cardWidth={cardWidth}
                // cardHeight={item.height}
            >
                <CardContent>
                    {/* <Image
                        source={item.image}
                        style={styles.image}
                        resizeMode="cover"
                    /> */}
                    {element}
                </CardContent>
            </Card>
        );
    };

    render() {
        const { activeCard, scrollEnabled } = this.state;
        const {
            data,
            renderDetails, // Renders the inside of the card
            listContainerStyle,
            listProps,
        } = this.props;

        // Animated the border radius
        const activeCardBorderRadius = this.animated.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [20, 10, 0],
        });

        // Adds a white background
        const activeCardBackground = this.animated.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)'],
        });

        const activeCardStyle = {
            width: this.dimensions.x,
            left: this.position.x,
            top: this.position.y,
            borderRadius: activeCardBorderRadius,
            ...styles.activeCard,
        };

        const closeOpacity = this.animated.interpolate({
            inputRange: [0, 0.75, 1],
            outputRange: [0, 0, 1],
        });

        const contentOpacity = this.detailAnimated.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 0.2, 1],
        });

        const contentOffsetX = this.detailAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [-5, 0],
            easing: Easing.bezier(0.025, -0.05, 0.1, -0.1),
        });

        const contentOffsetY = this.detailAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [-20, 0],
            easing: Easing.bezier(0.175, -0.885, 0.32, -1),
        });

        const activeDetailsStyle = {
            zIndex: 1,
            opacity: contentOpacity,
            transform: [
                {
                    translateY: contentOffsetY,
                },
                {
                    translateX: contentOffsetX,
                },
            ],
        };

        return (
            <SafeAreaView style={{ flex: 1 }} forceInset={{ bottom: 'never' }}>
                {/* <FlatList
                    // contentContainerStyle={}
                    contentContainerStyle={[
                        styles.flatlistContainer,
                        listContainerStyle,
                        {
                            backgroundColor: 'transparent',
                        },
                    ]}
                    keyExtractor={this.keyExtractor}
                    data={data}
                    renderItem={this.renderItem}
                    {...listProps}
                /> */}
                <SectionList
                    contentContainerStyle={[
                        styles.flatlistContainer,
                        listContainerStyle,
                        {
                            backgroundColor: 'transparent',
                        },
                    ]}
                    stickySectionHeadersEnabled={true}
                    keyExtractor={this.keyExtractor}
                    sections={data}
                    renderSectionHeader={({ section: { title } }) => {
                        return (
                            <View
                                style={{
                                    backgroundColor: 'white',
                                    paddingHorizontal: 17,
                                }}
                            >
                                <View
                                    style={{
                                        borderColor: AppStyle.pink,
                                        borderBottomWidth: 3,
                                    }}
                                >
                                    <Text style={styles.dateText}>{title}</Text>
                                </View>
                            </View>
                        );
                    }}
                    renderItem={this.renderItem}
                    {...listProps}
                />

                {/* GHOST VIEW */}
                <View
                    style={styles.ghostViewContainer}
                    pointerEvents={activeCard ? 'auto' : 'none'}
                    ref={view => {
                        this.ghostView = view;
                    }}
                >
                    <Animated.ScrollView
                        // onScroll={(e)=>{
                        //     var windowHeight = Dimensions.get('window').height,
                        //         height = e.nativeEvent.contentSize.height;
                        //     if( windowHeight >= height ){
                        //         this.shrink()
                        //     }
                        // }}
                        scrollEnabled={scrollEnabled}
                        style={[
                            styles.scrollViewContainer,
                            {
                                backgroundColor: activeCardBackground,
                                flex: 1,
                            },
                        ]}
                        contentContainerStyle={
                            styles.scrollViewContentContainer
                        }
                        pointerEvents={activeCard ? 'auto' : 'none'}
                    >
                        <View style={{flex: 1,}}>
                            {/* Header section. Moves upwards and expands. */}
                            <Card
                                // Height of the image when the card is opened
                                // cardHeight={
                                //     activeCard ? data[activeCard - 1].height : null
                                // }}
                                customContainerStyle={[activeCardStyle]}
                            >
                                <CloseButton
                                    onPress={this.shrink}
                                    opacity={closeOpacity}
                                />
                                <CardContent
                                    customContainerStyle={{
                                        borderRadius: activeCardBorderRadius,
                                    }}
                                >
                                    {/* <Image
                                        source={
                                            activeCard
                                                ? data[activeCard - 1].image
                                                : null
                                        }
                                        style={styles.image}
                                        resizeMode="cover"
                                    /> */}
                                    {/* {
                                        activeCard ?
                                            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                                                Ongoing News
                                            </Text>
                                            : null
                                    } */}
                                    {/* This will get the cloned version of the
                                    renderItem that was supplied in cards.js */}
                                    {this.clones[activeCard] || null}
                                </CardContent>
                            </Card>

                            {/* Details section. Fades in. */}
                            <Animated.View style={activeDetailsStyle}>
                                <DetailsContent>
                                    {(activeCard &&
                                        renderDetails(activeCard - 1)) ||
                                        null}
                                    <Image
                                        style={styles.mapImage}
                                        source={require('../../img/Map1.png')}
                                    />
                                    <BigButton
                                        text={'Finished Reading'}
                                        onPress={this.shrink}
                                    />
                                </DetailsContent>
                            </Animated.View>
                            </View>
                    </Animated.ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

CardList.propTypes = {
    data: PropTypes.instanceOf(Array),
    renderItem: PropTypes.func,
    renderDetails: PropTypes.func,
    listProps: PropTypes.instanceOf(Object),
    listContainerStyle: PropTypes.instanceOf(Object),
    cardWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

CardList.defaultProps = {
    data: [],
    cardWidth: 0,
    listContainerStyle: {},
    listProps: {},
    renderItem: () => null,
    renderDetails: () => null,
};

export default CardList;

const styles = StyleSheet.create({
    image: {
        flex: 1,
        alignSelf: 'stretch',
        width: undefined,
        height: undefined,
    },
    activeCard: {
        margin: 0,
        overflow: 'visible',
        shadowColor: 'rgb(0, 0, 0)',
        shadowOpacity: 0,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 0,
    },
    flatlistContainer: {
        flexGrow: 1,
        backgroundColor: 'rgb(250, 250, 250)',
    },
    ghostViewContainer: {
        ...StyleSheet.absoluteFill,
        flex: 1,
    },
    scrollViewContainer: {
        ...StyleSheet.absoluteFill,
    },
    scrollViewContentContainer: {
        flexGrow: 1,
    },
    dateText: {
        fontSize: 32,
        fontWeight: '800',
        marginVertical: 10,
    },
    importantNews: {
        padding: 15,
        marginTop: 10,
        marginHorizontal: 16,
        borderRadius: 20,
        width: width - 32,
        backgroundColor: AppStyle.red,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: 'rgb(0, 0, 0)',
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowRadius: 10,
    },
    importantText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        maxWidth: '80%',
        marginLeft: 15,
    },
    mapImage: {
        borderRadius: 20,
        alignSelf: 'center',
        width: '90%',
        height: '40%',
    },
});
