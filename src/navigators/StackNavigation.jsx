import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './../screens/HomeScreen';
import MovieScreen from './../screens/MovieScreen';
import SearchScreen from './../screens/SearchScreen';
import PersonScreen from './../screens/PersonScreen';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name='Movie' component={MovieScreen} options={{ headerShown: false }}/>
      <Stack.Screen name='Search' component={SearchScreen} options={{ headerShown: false }}/>
      <Stack.Screen name='Person' component={PersonScreen} options={{ headerShown: false }}/>

    </Stack.Navigator>
  );
};

export default StackNavigation;
