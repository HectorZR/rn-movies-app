import 'react-native-gesture-handler';
import React, {Suspense} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {appRoutes} from '../../routes';
import Loader from '../../components/Loader';

const Stack = createStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Suspense fallback={<Loader fullscreen />}>
          <Stack.Navigator initialRouteName="home">
            {appRoutes.map((route) => (
              <Stack.Screen
                name={route.name}
                component={route.component}
                options={route.options}
                key={route.name}
              />
            ))}
          </Stack.Navigator>
        </Suspense>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
