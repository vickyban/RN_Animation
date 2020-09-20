import React, { useCallback, memo } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Animated, { eq, interpolate, sub } from 'react-native-reanimated'
import { withTimingTransition, useTransition, interpolateColor } from 'react-native-redash';

interface TabProps {
    index: number;
    navigation: any;
    descriptors: any;
    route: any;
    isFocused: boolean;
}

export const TAB_HEIGHT = 50;
export const ICON_SIZE = 30;

const Tab = memo(({ index, isFocused, navigation, descriptors, route }: TabProps) => {
    const { options } = descriptors[route.key];
    const animation = useTransition(isFocused, { duration: 300 })

    const scale = animation;
    const opacity = sub(1, animation);

    const iconScale = interpolate(animation, {
        inputRange: [0, 0.3, 1],
        outputRange: [1, 0.8, 1.2]
    })
    const iconHeight = interpolate(animation, {
        inputRange: [0, 0.6, 1],
        outputRange: [0, 0, ICON_SIZE]
    })
    const translateY = interpolate(animation, {
        inputRange: [0, 0.6, 1],
        outputRange: [0, 5, -10]
    })
    // const label =
    //     options.tabBarLabel !== undefined
    //         ? options.tabBarLabel
    //         : options.title !== undefined
    //             ? options.title
    //             : route.name;

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
            <View style={styles.border}>
                <Animated.View style={[{
                    width: ICON_SIZE * 2,
                    height: ICON_SIZE * 2,
                    borderRadius: ICON_SIZE,
                    borderWidth: 6,
                    borderColor: '#FF87A2',
                    opacity,
                    transform: [
                        { scale },
                    ]
                }]} />
            </View>
            <Animated.View
                style={{
                    transform: [
                        { scale: iconScale },
                        { translateY }
                    ]
                }}
            >
                <options.tabBarIcon color={'#3B1F2B'} style={styles.icon} />
                <Animated.View style={[styles.activeIcon, { height: iconHeight }]}>
                    <options.tabBarIcon color={'#FF87A2'} style={styles.icon} />
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
    }
})
