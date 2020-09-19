import React from 'react'
import { StyleSheet, Text, View, Dimensions, Image, Animated, TouchableWithoutFeedback } from 'react-native'
import { SharedElement } from 'react-navigation-shared-element';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
export const CARD_WIDTH = width * 0.6;
export const CARD_HEIGHT = CARD_WIDTH * 1.5;

export const ACTUAL_CARD_WIDTH = CARD_WIDTH;

const VISIBLE_ITEMS = 3;

const Card = ({ item, index, x }) => {
    const navigation = useNavigation();
    const position = Animated.subtract(index * ACTUAL_CARD_WIDTH, x);
    const isDisappearing = -ACTUAL_CARD_WIDTH;
    const isTop = 0;
    const isMid = ACTUAL_CARD_WIDTH;
    const isBottom = ACTUAL_CARD_WIDTH * 2;
    const isAppearing = ACTUAL_CARD_WIDTH * 3;

    const translateX =
        position.interpolate({
            inputRange: [isTop, isMid, isBottom, isAppearing],
            outputRange: [0, -ACTUAL_CARD_WIDTH * 0.6, -ACTUAL_CARD_WIDTH * 1.3, -ACTUAL_CARD_WIDTH * 2.1],
            extrapolate: 'clamp'
        })
    const scale = position.interpolate({
        inputRange: [isTop, isMid, isBottom],
        outputRange: [1, 0.8, 0.6],
        // extrapolate: 'clamp'
    })
    const opacity = position.interpolate({
        inputRange: [isDisappearing, isTop, isMid, isBottom, isAppearing],
        outputRange: [0, 1, 0.9, 1 / VISIBLE_ITEMS, 0]
    })
    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Item', { item })}
        >
            <Animated.View style={[styles.container, {
                opacity,
                transform: [
                    { translateX },
                    { scale }
                ]
            }]}>
                <SharedElement style={{ flex: 1 }} id={`item.${item.id}.photo`}>
                    <Image source={item.img} style={styles.img} />
                </SharedElement>
            </Animated.View>
        </TouchableWithoutFeedback>
    )
}

export default Card

const styles = StyleSheet.create({
    container: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        overflow: 'hidden'
    },
    img: {
        // flex: 1,
        // height: undefined,
        // width: undefined,
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: 20,
        overflow: 'hidden'
    }
})
