import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, Animated, Easing, Image } from 'react-native';
import LottieView from 'lottie-react-native';
import useCachedResources from '@hooks/useCachedResources';
import MaskedView from '@react-native-community/masked-view';

const catIcon = require('@assets/images/catIcon.png');

const AppLoader = ({ children }) => {
    const isAppReady = useCachedResources();
    const [animationCompleted, setAnimationCompleted] = useState(false);
    const progress = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (!isAppReady) return;
        Animated.timing(progress, {
            toValue: 1,
            duration: 1000,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true
        }).start(() => setAnimationCompleted(true));
    }, [isAppReady])

    const opacity = progress.interpolate({
        inputRange: [0, 0.15, 0.3],
        outputRange: [0, 1, 1]
    });
    const scale = progress.interpolate({
        inputRange: [0, 0.1, 1],
        outputRange: [1, 0.8, 80],
        extrapolateLeft: 'clamp'
    })

    if (!isAppReady) null;
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
