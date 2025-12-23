

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackNavigation from './src/navigators/StackNavigation';

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <StackNavigation/>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;
