import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Tab, { TAB_HEIGHT } from './Tab';
import { useTransition, useValue, withTransition, timing } from 'react-native-redash';
import Animated, { interpolate, useCode, onChange, set } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const TAB_WIDTH = width / 4;
const DOT_SIZE = 8;

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    const focusedOptions = descriptors[state.routes[state.index].key].options;
    const activeIndex = state.index;
    const transition = useTransition(activeIndex, { duration: 400 });
    const activeTransition = useValue(0);

    if (focusedOptions.tabBarVisible === false) {
        return null;
    }

    const translateX = interpolate(transition, {
        inputRange: [0, 1, 2, 3],
        outputRange: [0, 1 * TAB_WIDTH, 2 * TAB_WIDTH, 3 * TAB_WIDTH]
    });
    const translateY = interpolate(activeTransition, {
        inputRange: [0, 0.6, 1],
        outputRange: [0, -TAB_HEIGHT / 2, 0]
    });
    const opacity = interpolate(activeTransition, {
        inputRange: [0, 0.5, 1],
        outputRange: [0, 1, 0]
    });
    const scale = interpolate(activeTransition, {
        inputRange: [0, 0.5, 1],
        outputRange: [0.9, 1.2, 0.8]
    });

    useCode(() => [
        onChange(activeIndex, set(activeTransition, 0)),
        set(activeTransition, timing({ duration: 400 }))
    ], [activeIndex])

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.dot, {
                opacity,
                transform: [{ translateX }, { translateY }, { scale }]
            }]} />
            {
                state.routes.map((route, index) => <Tab
                    key={`tab-${index}`}
                    index={index}
                    isFocused={state.index === index}
                    route={route}
                    navigation={navigation}
                    descriptors={descriptors}
                />)
            }
        </View>
    )
}

export default TabBar

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    dot: {
        position: 'absolute',
        left: TAB_WIDTH / 2 - DOT_SIZE / 2,
        top: TAB_HEIGHT / 2 - DOT_SIZE / 2,
        width: DOT_SIZE,
        height: DOT_SIZE,
        borderRadius: DOT_SIZE / 2,
        backgroundColor: '#F4909D'
    }
})
