import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/home';
import ListDrinks from './src/screens/listDrinks';
import {Drink} from './src/models/drink';
import DrinkDetail from './src/screens/drinkDetail';

export type RootStackParamList = {
  Home: undefined;
  ListDrinks: {drinks: Drink[]};
  DrinkDetail: {drink: Drink};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="ListDrinks"
          component={ListDrinks}
          initialParams={{drinks: []}}
        />
        <Stack.Screen
          name="DrinkDetail"
          component={DrinkDetail}
          initialParams={{
            drink: {idDrink: '', strDrink: '', strDrinkThumb: ''},
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
