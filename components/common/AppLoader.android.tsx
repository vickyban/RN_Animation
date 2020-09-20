import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native';
import useCachedResources from '@hooks/useCachedResources';
import { useTransition } from 'react-native-redash';
import Animated, { interpolate, useCode, cond, eq, call, Extrapolate } from 'react-native-reanimated';

const catIcon = require('@assets/images/catIcon.png');

const AppLoader = ({ children }) => {
    const isAppReady = useCachedResources();
    const [doneAnimation, setDoneAnimation] = useState(false);
    const progress = useTransition(isAppReady, { duration: 2000 });

    const opacity = interpolate(progress, {
        inputRange: [0.6, 1],
        outputRange: [1, 0]
    });

    const appOpacity = interpolate(progress, {
        inputRange: [0.6, 1],
        outputRange: [0, 1]
    });
    const scale = interpolate(progress, {
        inputRange: [0, 0.1, 1],
        outputRange: [1, 0.8, 80],
        extrapolate: Extrapolate.CLAMP
    })

    useCode(() => [
        cond(eq(progress, 1), call([], () => setDoneAnimation(true)))
    ], [])

    if (!isAppReady) return null;
    return (
        <View style={styles.container}>
            {
                !doneAnimation && (<View style={{
                    ...StyleSheet.absoluteFillObject,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Animated.Image
                        source={catIcon}
                        style={{
                            width: 150,
                            height: 150,
                            opacity,
                            transform: [{ scale }]
                        }} resizeMode='contain'
                    />
                </View>)
            }
            <Animated.View style={{ flex: 1, opacity: appOpacity }}>
                {children}
            </Animated.View>
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
