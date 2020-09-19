import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import { useValue, interpolateColor, useTapGestureHandler, usePanGestureHandler, snapPoint, timing } from 'react-native-redash/lib/module/v1';
import Animated, { interpolate, useCode, cond, eq, set, and, add, not, call, min, max, neq, or, debug } from 'react-native-reanimated';
import { LongPressGestureHandler, State, PanGestureHandler, ScrollView } from 'react-native-gesture-handler';

const images = [
    { id: 1, img: require('@assets/images/img1.png') },
    { id: 2, img: require('@assets/images/img2.png') },
    { id: 3, img: require('@assets/images/img3.png') },
]

const HoldAndDrag = () => {
    const [scrollEnabled, setScrollEnabled] = useState(true);
    const active = useValue(0);
    const longPress = useRef();
    const dragPan = useRef();
    const backgroundColor = interpolateColor(active, {
        inputRange: [0, 1],
        outputRange: ['red', 'green']
    })
    const { gestureHandler: panGestureHandler, state: panState, translation, velocity } = usePanGestureHandler();
    const { gestureHandler, state } = useTapGestureHandler();
    const offset = useValue(0);
    const translateX = useValue(0);
    const to = snapPoint(translateX, velocity.x, [0, 200])

    useCode(() => [
        cond(and(eq(state, State.ACTIVE), not(active)), [
            set(active, 1),
            call([], () => setScrollEnabled(false))]),
        debug('State', state),
        cond(and(eq(state, State.END), active), [
            set(active, 0),
            call([], () => setScrollEnabled(true))]),
    ], []);

    useCode(() => [
        cond(and(active, eq(panState, State.ACTIVE)), [
            set(translateX, max(add(offset, translation.x), 0))
        ]),
        cond(eq(panState, State.END), [
            set(translateX, timing({ from: translateX, to })),
            set(offset, translateX)
        ])
    ], []);

    const opacity = interpolate(translateX, {
        inputRange: [0, 200],
        outputRange: [1, 0.5]
    })
    return (
        <Animated.View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
            <PanGestureHandler
                ref={dragPan}
                {...panGestureHandler}
                simultaneousHandlers={longPress}
            >
                <Animated.View style={{ flex: 1 }}>
                    <LongPressGestureHandler
                        ref={longPress}
                        minDurationMs={400}
                        {...gestureHandler}
                        simultaneousHandlers={dragPan}
                        shouldCancelWhenOutside={false}
                    >
                        <Animated.View style={{
                            flex: 1,
                            backgroundColor: backgroundColor,
                            opacity,
                            transform: [{ translateX }]
                        }} >
                            <ScrollView scrollEnabled={scrollEnabled} waitFor={[dragPan, longPress]}>
                                <Image source={images[0].img} style={styles.img} />
                                <Image source={images[1].img} style={styles.img} />
                                <Image source={images[2].img} style={styles.img} />
                            </ScrollView>
                        </Animated.View>
                    </LongPressGestureHandler>
                </Animated.View>
            </PanGestureHandler>
        </Animated.View >
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
