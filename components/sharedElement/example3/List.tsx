import React, { useRef, useCallback } from 'react'
import { StyleSheet, Text, View, Dimensions, FlatList, Image, TouchableWithoutFeedback, Animated, SafeAreaView, Easing } from 'react-native'
import { SharedElement } from 'react-navigation-shared-element';
import { useNavigation } from '@react-navigation/native';
const items = [
    { id: '1', title: 'Lost in the woood', img: require('@assets/unsplash/img1.jpg'), color: '#0C212D', text: 'The trick to achieve dynamic splash screen is to have static content as splash screen, followed by loading next screen which initially contains the same screen as splash screen and then it continues with the animation.' },
    { id: '2', title: 'First see a deer', img: require('@assets/unsplash/img2.jpg'), color: '#F8EACE', text: 'The trick to achieve dynamic splash screen is to have static content as splash screen, followed by loading next screen which initially contains the same screen as splash screen and then it continues with the animation.' },
    { id: '3', title: 'Eating unique food', img: require('@assets/unsplash/img3.jpg'), color: '#E4E5EA', text: 'The trick to achieve dynamic splash screen is to have static content as splash screen, followed by loading next screen which initially contains the same screen as splash screen and then it continues with the animation.' },
    { id: '4', title: 'Seilwared', img: require('@assets/unsplash/img4.jpg'), color: '#0C212D', text: 'The trick to achieve dynamic splash screen is to have static content as splash screen, followed by loading next screen which initially contains the same screen as splash screen and then it continues with the animation.' },
    { id: '5', title: 'Seilwared', img: require('@assets/unsplash/img5.jpg'), color: '#0C212D', text: 'The trick to achieve dynamic splash screen is to have static content as splash screen, followed by loading next screen which initially contains the same screen as splash screen and then it continues with the animation.' },
]

const AFlatList = Animated.createAnimatedComponent(FlatList);
const { width, height } = Dimensions.get('window');
const CARD_CONTENT_WIDTH = width * 0.8;
const CARD_CONTENT_HEIGHT = width * 0.5;
const CARD_SPACING = width * 0.1;


const List = () => {
    const navigation = useNavigation();
    const x = useRef(new Animated.Value(0)).current;
    const onScroll = Animated.event([{
        nativeEvent: { contentOffset: { x } }
    }], { useNativeDriver: true })
    return (
        <View style={{ flex: 1 }}>
            <AFlatList
                bounces={false}
                scrollEventThrottle={16}
                onScroll={onScroll}
                horizontal
                snapToInterval={width}
                decelerationRate='fast'
                data={items}
                renderItem={({ item, index }) => {
                    const progress = new Animated.Value(0);
                    // const translateX = x.interpolate({
                    //     inputRange: [(index - 1) * width, index * width, (index + 1) * width],
                    //     outputRange: [-CARD_SPACING, 0, CARD_SPACING + 40]
                    // });

                    const textOpacity = x.interpolate({
                        inputRange: [(index - 0.5) * width, index * width, (index + 0.5) * width],
                        outputRange: [0, 1, 0]
                    });

                    const textTranslateY = x.interpolate({
                        inputRange: [(index - 0.5) * width, index * width, (index + 0.5) * width],
                        outputRange: [30, 0, -30]
                    });

                    const textTranslateX = x.interpolate({
                        inputRange: [(index - 1) * width, index * width, (index + 1) * width],
                        outputRange: [-width, 0, width]
                    });

                    const scale = progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 0.8],
                        extrapolate: 'clamp'
                    })

                    const onPress =
                        () => {
                            Animated.timing(progress, {
                                toValue: 1,
                                duration: 200,
                                easing: Easing.ease,
                                useNativeDriver: true
                            }).start(() => {
                                navigation.push('Item', { item })
                                progress.setValue(0)
                            })
                        }


                    return (
                        <View style={styles.card}>
                            <SharedElement id={`item.${item.id}.photo`} style={StyleSheet.absoluteFillObject}>
                                <Image source={item.img} style={{ position: 'absolute', width, height, opacity: 0.7 }} />
                            </SharedElement>
                            <View style={{ flex: 1, paddingTop: 50, paddingLeft: 20 }}>
                                <Animated.View style={{ transform: [{ translateX: textTranslateX }] }}>
                                    <View style={{ overflow: 'hidden', }}>
                                        <Animated.Text style={[styles.title, {
                                            opacity: textOpacity,
                                            transform: [
                                                { translateY: textTranslateY },
                                            ]
                                        }]}>{item.title}</Animated.Text>
                                    </View>
                                    <Animated.Text style={[styles.text, {
                                        opacity: textOpacity,
                                    }]}>{item.text}</Animated.Text>
                                </Animated.View>


                            </View>

                            <TouchableWithoutFeedback onPress={onPress}>
                                <SharedElement id={`item.${item.id}.location`} style={{ alignSelf: 'center' }}>
                                    <Animated.View
                                        style={[styles.cardContent, { transform: [{ scale }] }]}
                                    >
                                        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                            <SharedElement id={`item.${item.id}.avatar`}>
                                                <Image source={item.img} style={{ width: 100, height: 100, borderRadius: 50 }} />
                                            </SharedElement>
                                            <View style={{ flex: 1, marginLeft: 12 }}>
                                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.title}</Text>
                                                <Text style={{ fontSize: 16 }}>Developer</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 12 }}>
                                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text>120</Text>
                                                <Text>Album</Text>
                                            </View>
                                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text>120</Text>
                                                <Text>Followers</Text>
                                            </View>
                                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text>120</Text>
                                                <Text>Following</Text>
                                            </View>
                                        </View>
                                    </Animated.View>
                                </SharedElement>
                            </TouchableWithoutFeedback>
                        </View>
                    )
                }}
            />
        </View>
    )
}

export default List

const styles = StyleSheet.create({
    card: {
        width,
        height,
        paddingBottom: 10,
        // paddingLeft: 1,
    },
    cardContent: {
        width: CARD_CONTENT_WIDTH,
        height: CARD_CONTENT_HEIGHT,
        backgroundColor: 'white',
        padding: 12,
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
        width: CARD_CONTENT_WIDTH,
    },
    text: {
        color: 'white',
        fontSize: 14,
        width: CARD_CONTENT_WIDTH,
    }
})
