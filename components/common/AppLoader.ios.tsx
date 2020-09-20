import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import useCachedResources from '@hooks/useCachedResources';
import MaskedView from '@react-native-community/masked-view';
import { useTransition } from 'react-native-redash';
import Animated, { interpolate, Extrapolate } from 'react-native-reanimated';

const catIcon = require('@assets/images/catIcon.png');

const AppLoader = ({ children }) => {
    const isAppReady = useCachedResources();
    const progress = useTransition(isAppReady, { duration: 3000 });

    if (!isAppReady) return null;

    const opacity = interpolate(progress, {
        inputRange: [0, 0.15, 0.3],
        outputRange: [0, 1, 1]
    });
    const scale = interpolate(progress, {
        inputRange: [0, 0.1, 1],
        outputRange: [1, 0.8, 80],
        extrapolate: Extrapolate.CLAMP
    })

    return (
        <View style={styles.container}>
            <MaskedView style={StyleSheet.absoluteFillObject} maskElement={
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Animated.Image source={catIcon} style={{ width: 150, height: 150, transform: [{ scale }] }} resizeMode='contain' />
                </View>
            }>
                <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'white' }]} />
                <Animated.View style={{ flex: 1, opacity }}>
                    {children}
                </Animated.View>
            </MaskedView>
        </View>
    )
}

export default AppLoader

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "#1DA1F2"
    },
    lottie: {
        height: 200,
        width: 200,
    }
})
