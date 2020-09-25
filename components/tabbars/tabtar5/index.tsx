import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, SafeAreaView } from 'react-native'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Tab, { TAB_HEIGHT, ICON_SIZE } from './Tab';
import { useTransition, useValue, withTransition, timing, useSpringTransition } from 'react-native-redash';
import Animated, { interpolate, useCode, onChange, set, multiply, cond, neq } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const TAB_WIDTH = width / 4;
const DOT_SIZE = ICON_SIZE * 1.6;

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    const focusedOptions = descriptors[state.routes[state.index].key].options;
    const activeIndex = state.index;
    const activeAIndex = useValue(0);

    if (focusedOptions.tabBarVisible === false) {
        return null;
    }


    useCode(() => [
        cond(neq(activeIndex, activeAIndex), set(activeAIndex, activeIndex))
    ], [activeIndex])

    return (
        <SafeAreaView style={styles.container}>
            {
                state.routes.map((route, index) => <Tab
                    key={`tab-${index}`}
                    index={index}
                    activeIndex={activeAIndex}
                    isFocused={activeIndex === index}
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
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 6,
    },

})
