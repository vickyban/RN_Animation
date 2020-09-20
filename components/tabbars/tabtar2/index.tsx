import React from 'react'
import { StyleSheet, Text, View, Dimensions, SafeAreaView } from 'react-native'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Tab, { TAB_HEIGHT, ICON_SIZE } from './Tab';
import { useTransition, useValue, withTransition, timing, useSpringTransition } from 'react-native-redash';
import Animated, { interpolate, useCode, onChange, set, multiply } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const TAB_WIDTH = width / 4;
const DOT_SIZE = ICON_SIZE * 1.6;

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    const focusedOptions = descriptors[state.routes[state.index].key].options;
    const activeIndex = state.index;
    const transition = useSpringTransition(activeIndex);
    const activeTransition = useValue(0);

    if (focusedOptions.tabBarVisible === false) {
        return null;
    }

    const translateX = multiply(transition, TAB_WIDTH);

    const translateY = interpolate(activeTransition, {
        inputRange: [0, 0.6, 1],
        outputRange: [-10, - 5, -10]
    });
    const scale = interpolate(activeTransition, {
        inputRange: [0, 0.5, 1],
        outputRange: [1, 0.9, 1.2]
    });

    useCode(() => [
        onChange(activeIndex, set(activeTransition, 0)),
        set(activeTransition, timing({ duration: 400 }))
    ], [activeIndex])

    return (
        <SafeAreaView style={styles.container}>
            <Animated.View style={[styles.dot, {
                transform: [
                    { translateX },
                    { translateY },
                    { scale }
                ]
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
        </SafeAreaView>
    )
}

export default TabBar

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#74BCB8',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 6,
    },
    dot: {
        position: 'absolute',
        left: TAB_WIDTH / 2 - DOT_SIZE / 2,
        top: 0,
        width: DOT_SIZE,
        height: DOT_SIZE,
        borderRadius: DOT_SIZE / 2,
        // borderBottomRightRadius: DOT_SIZE / 2,
        // borderBottomLeftRadius: DOT_SIZE / 2,
        backgroundColor: '#74BCB8',
    }
})
