import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { useValue, interpolateColor, useTapGestureHandler, usePanGestureHandler, snapPoint, timing, useClock } from 'react-native-redash/lib/module/v1';
import Animated, { interpolate, useCode, cond, eq, set, and, add, not, call, min, max, neq, or, debug, lessThan, clockRunning, stopClock, Extrapolate } from 'react-native-reanimated';
import { LongPressGestureHandler, State, PanGestureHandler, ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';

const images = [
    { id: 1, img: require('@assets/images/img1.png') },
    { id: 2, img: require('@assets/images/img2.png') },
    { id: 3, img: require('@assets/images/img3.png') },
]

const { height } = Dimensions.get('window');
const HoldAndDrag = () => {
    const navigation = useNavigation();
    const dragPan = useRef();
    const { gestureHandler: panGestureHandler, state, translation, velocity } = usePanGestureHandler();
    const offset = useValue(0);
    const translateY = useValue(0);
    const clock = useClock();
    const to = snapPoint(translateY, velocity.y, [0, 200, height]);

    useCode(() => [
        cond(eq(state, State.ACTIVE), [
            set(translateY, max(add(offset, translation.y), 0))
        ]),
        cond(eq(state, State.END), [
            set(translateY, timing({ clock, from: translateY, to })),
            set(offset, translateY),
            cond(and(not(clockRunning(clock)), eq(to, height)), [
                call([], () => navigation.goBack())
            ])
        ]),
    ], []);

    const opacity = interpolate(translateY, {
        inputRange: [200, height],
        outputRange: [1, 0.5]
    });
    const scale = interpolate(translateY, {
        inputRange: [0, 200],
        outputRange: [1, 0.8],
        extrapolate: Extrapolate.CLAMP
    })
    return (
        <BlurView style={StyleSheet.absoluteFillObject} intensity={100}>
            <Animated.View style={{
                flex: 1,
                opacity,
                backgroundColor: '#f3f3f3',
                transform: [{ translateY }, { scale }]
            }}>
                <ScrollView>
                    <Image source={images[0].img} style={styles.img} />
                    <Image source={images[1].img} style={styles.img} />
                    <Image source={images[2].img} style={styles.img} />
                </ScrollView>
                <PanGestureHandler
                    ref={dragPan}
                    {...panGestureHandler}
                    minDist={20}
                >
                    <Animated.View style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        height: 100,
                    }} >

                    </Animated.View>
                </PanGestureHandler>
            </Animated.View >
        </BlurView>
    )
}

export default HoldAndDrag

const styles = StyleSheet.create({
    img: {
        width: 200,
        height: 300,
        marginVertical: 10
    },
})
