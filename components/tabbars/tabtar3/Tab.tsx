import React, { useCallback, memo } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Animated, { eq, interpolate, sub, cond, Extrapolate, concat } from 'react-native-reanimated'
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
    const animation = withTransition(active, { duration: 400 });

    const iconHeight = interpolate(animation, {
        inputRange: [0, 1],
        outputRange: [ICON_SIZE, 0],
        extrapolate: Extrapolate.CLAMP
    })

    const translateY = cond(active, interpolate(animation, {
        inputRange: [0, 0.4],
        outputRange: [0, ICON_SIZE / 2],
        extrapolate: Extrapolate.CLAMP
    }), 0)

    const translateX = cond(active, interpolate(animation, {
        inputRange: [0, 0.3, .4, 0.5, 0.7, 0.9, 1],
        outputRange: [0, -4, 0, 3, 0, -2, 0],
        extrapolate: Extrapolate.CLAMP
    }), 0)

    const rotate = cond(active, interpolate(animation, {
        inputRange: [0, 0.3, .4, 0.5, 0.7, 0.9, 1],
        outputRange: [0, -25, 0, 15, 0, -9, 0],
        extrapolate: Extrapolate.CLAMP
    }), 0)

    const opacity = cond(active, sub(1, animation), 0)

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
            <View style={StyleSheet.absoluteFillObject} >
                <Animated.View style={[styles.drop, { opacity, transform: [{ translateY }] }]} />
            </View>
            <Animated.View style={{
                transform: [
                    { translateX },
                    { rotateZ: concat(rotate, 'deg') }
                ]
            }}>
                <options.tabBarIcon color={'#FF87A2'} style={[styles.icon]} />
                <Animated.View style={[styles.activeIcon, { height: iconHeight }]}>
                    <options.tabBarIcon color={'#3B1F2B'} style={styles.icon} />
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
        width: 6,
        height: 8,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        alignSelf: 'center',
        backgroundColor: '#FF87A2'
    }
})
