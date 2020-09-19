import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import * as React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import HoldAndDragScreen from '@screens/basicAnimation/HoldAndDragScreen';
import SwipeCarousel from '@screens/basicAnimation/SwipeCarousel';
import Home from '@screens/basicAnimation/HomeScreen';
import { TransitionPresets } from '@react-navigation/stack';

const Stack = createSharedElementStackNavigator();

export default function SharedElementNavigator() {
    return (
        <Stack.Navigator initialRouteName='Home' screenOptions={{
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            ...TransitionPresets.SlideFromRightIOS,
            cardStyle: { backgroundColor: 'transparent' },
        }}>
            {/* <Stack.Screen name="Home" component={Home} /> */}
            <Stack.Screen name="Home" component={SwipeCarousel} />
            <Stack.Screen
                name="HoldAndDragScreen"
                component={HoldAndDragScreen} options={{
                    headerShown: false
                }} />
        </Stack.Navigator >
    );
}
