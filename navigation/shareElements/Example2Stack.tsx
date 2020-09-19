import * as React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import ListScreen from '@screens/sharedElement/Example2List';
import ItemScreen from '@screens/sharedElement/Example2Item';

import { Easing } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';


const Stack = createSharedElementStackNavigator();

export default function SharedElementNavigator() {
    return (
        <Stack.Navigator initialRouteName='List' screenOptions={{
            headerTransparent: true,
            headerTitle: '',
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            transitionSpec: {
                open: {
                    animation: 'timing',
                    config: { duration: 400, easing: Easing.inOut(Easing.ease) }
                },
                close: {
                    animation: 'timing',
                    config: { duration: 400, easing: Easing.inOut(Easing.ease) }
                },
            },
            cardStyleInterpolator: ({ current: { progress } }) => ({
                cardStyle: {
                    opacity: progress
                }
            })
        }
        }>
            <Stack.Screen name="List" component={ListScreen} />
            <Stack.Screen
                name="Item"
                component={ItemScreen}
                options={{
                    animationTypeForReplace: 'pop',
                    headerLeft: ({ onPress }) => (<Icon name='md-arrow-round-back' style={{
                        paddingHorizontal: 12,
                        fontSize: 30,
                        color: 'white',
                    }} onPress={onPress} />)
                }}

                sharedElementsConfig={(route) => {
                    const { item } = route.params;
                    return [
                        { id: `item.${item.id}.photo`, animation: 'move' },
                        { id: `item.${item.id}.location`, animation: 'move' }
                    ];
                }}
            />
        </Stack.Navigator >
    );
}
