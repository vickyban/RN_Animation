import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import AppLoader from '@components/common/AppLoader';

export default function App() {
  const colorScheme = useColorScheme();


  return (
    <AppLoader>
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    </AppLoader>
  );
}
