import React, { useCallback, memo } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Animated, { eq, interpolate, sub, cond, Extrapolate, concat, Easing } from 'react-native-reanimated'
import { withTimingTransition, useTransition, interpolateColor, withTransition, withSpring, withSpringTransition, spring } from 'react-native-redash';

interface TabProps {
    index: number;
    activeIndex: Animated.Value<number>
    navigation: any;
    descriptors: any;
    route: any;
    isFocused: boolean;
}

export const TAB_HEIGHT = 50;
export const ICON_SIZE = 30;

const Tab = memo(({ index, activeIndex, isFocused, navigation, descriptors, route }: TabProps) => {
    const { options } = descriptors[route.key];
    const active = eq(activeIndex, index);
    const animation = withTransition(active, { duration: 500, easing: Easing.inOut(Easing.ease) });

    const scale = cond(active, interpolate(animation, {
        inputRange: [0, 0.3, 0.4, 0.6, 1],
        outputRange: [0, 0.8, 0.2, 0.2, 1],
        extrapolate: Extrapolate.CLAMP
    }), interpolate(animation, {
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: Extrapolate.CLAMP
    }))

    const opacity = interpolate(animation, {
        inputRange: [0, 0.3, 0.6],
        outputRange: [0, 0, 1],
        extrapolate: Extrapolate.CLAMP
    })

    const translateY = interpolate(animation, {
        inputRange: [0.4, 0.8],
        outputRange: [0, -ICON_SIZE / 2],
        extrapolate: Extrapolate.CLAMP
    })

    const onPress = useCallback(() => {
        const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
        }
    }, [isFocused]);

    const onLongPress = () => {
        navigation.emit({
            type: 'tabLongPress',
            target: route.key,
        });
    };

    return (
        <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.container}
        >
            <Animated.View style={{ transform: [{ translateY }] }} >
                <View style={[StyleSheet.absoluteFillObject, { justifyContent: 'center', alignItems: 'center' }]} >
                    <Animated.View style={[styles.drop, { transform: [{ scale }] }]} />
                </View>
                <Animated.View style={{ opacity: sub(1, opacity) }}>
                    <options.tabBarIcon color={'#3B1F2B'} style={[styles.icon]} />
                </Animated.View>
                <Animated.View style={[styles.activeIcon, { opacity }]}>
                    <options.tabBarIcon color={'white'} style={styles.icon} />
                </Animated.View>
            </Animated.View>
        </TouchableOpacity>
    )
})

export default Tab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: TAB_HEIGHT,
    },
    text: {
        textAlign: 'center',
    },
    border: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        width: ICON_SIZE,
        height: ICON_SIZE,
        fontSize: ICON_SIZE,
        textAlign: 'center'
    },
    activeIcon: {
        ...StyleSheet.absoluteFillObject,
        overflow: 'hidden',
    },
    drop: {
        width: ICON_SIZE * 1.4,
        height: ICON_SIZE * 1.4,
        borderRadius: ICON_SIZE * 1.4 / 2,
        alignSelf: 'center',
        backgroundColor: '#FF87A2',
        overflow: 'hidden'
    }
})
