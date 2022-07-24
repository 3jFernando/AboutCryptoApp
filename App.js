// navegacion
import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

// componentes
import HomeComponent from './components/Home'

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          options={{ title: 'About Crypto' }}
          component={HomeComponent}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;