import React from 'react'
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import Animated, { interpolate, Extrapolate } from 'react-native-reanimated'
import { SharedElement } from 'react-navigation-shared-element';
import { LinearGradient } from 'expo-linear-gradient';

const { height } = Dimensions.get('window');
export const COVER_HEIGHT = height * 0.4;

interface CoverProps {
    item: {
        id: number | string,
        img: number
    },
    y: Animated.Node<number>
}

const Cover = ({ item, y }: CoverProps) => {
    const scale = interpolate(y, {
        inputRange: [-10, 0],
        outputRange: [1.1, 1],
        extrapolateRight: Extrapolate.CLAMP
    });
    const translateY = interpolate(y, {
        inputRange: [0, COVER_HEIGHT],
        outputRange: [0, -COVER_HEIGHT],
        extrapolate: Extrapolate.CLAMP
    })
    return (
        <Animated.View style={[styles.container, {
            transform: [{ scale }, { translateY }]
        }]}>
            <SharedElement id={`item.${item.id}.photo`} style={StyleSheet.absoluteFillObject}>
                <Image source={item.img} style={styles.img} resizeMode='cover' />
            </SharedElement>
        </Animated.View>
    )
}

export default Cover

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: COVER_HEIGHT,
    },
    img: {
        flex: 1,
        height: undefined,
        width: undefined
    },
})
