import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import * as React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import ListScreen from '@screens/sharedElement/ListScreen';
import ListItemScreen from '@screens/sharedElement/ListItemScreen';
import Example2 from './shareElements/Example2Stack';
import Example3 from './shareElements/Example3Stack';
import { SharedElementStackParamList } from '../types';
import { TransitionPresets } from '@react-navigation/stack';

const Stack = createSharedElementStackNavigator<SharedElementStackParamList>();

export default function SharedElementNavigator() {
  return (
    <Stack.Navigator screenOptions={{
      gestureEnabled: true,
      gestureDirection: 'horizontal',
      ...TransitionPresets.SlideFromRightIOS,
    }
    }>
      {/* <Stack.Screen name="List" component={ListScreen} />
      <Stack.Screen
        name="Item"
        component={ListItemScreen}
        options={{
          headerShown: false
        }}
        sharedElementsConfig={(route) => {
          const { item } = route.params;
          return [{ id: `item.${item.id}.photo`, animation: 'move' }];
        }}
      /> */}
      <Stack.Screen name='example2' component={Example2} options={{ headerShown: false }} />
    </Stack.Navigator >
  );
}
