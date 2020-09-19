import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useCode, startClock, Clock, block, set, timing, Easing, cond, eq, not, and, clockRunning, stopClock } from 'react-native-reanimated';
import { useClock, useValue } from 'react-native-redash/lib/module/v1';

const runTiming = (clock: Clock) => {
    const state = {
        finished: new Animated.Value(0),
        position: new Animated.Value(0),
        frameTime: new Animated.Value(0),
        time: new Animated.Value(0)
    };
    const config = {
        toValue: new Animated.Value(1),
        duration: 3000,
        easing: Easing.inOut(Easing.ease)
    }
    return block([
        cond(not(clockRunning(clock)),
            set(state.time, 0),
            timing(
                clock,
                state,
                config
            )),
        cond(eq(state.finished, 1),
            [
                set(state.finished, 0),
                set(state.frameTime, 0),
                set(state.time, 0),
                set(config.toValue, not(state.position)),
            ],
            state.position
        )
    ]);
}

const Time = () => {
    const [play, setPlay] = useState(false);
    const isPlaying = useValue(0);
    const clock = useClock();
    const progress = useValue(0);

    useCode(() => set(isPlaying, play ? 1 : 0), [play]);

    useCode(() => [
        cond(
            and(
                isPlaying,
                not(clockRunning(clock))
            ), startClock(clock),
        ),
        cond(
            and(
                not(isPlaying),
                clockRunning(clock)
            ), stopClock(clock),
        ),
        set(progress, runTiming(clock))
    ], [])
    return (
        <View>
            <Text></Text>
        </View>
    )
}

export default Time

const styles = StyleSheet.create({})
