import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

/*Screens*/
import HomePage from "../pages/HomePage";
import VisitorEntry from "../pages/VisitorEntry";
import VisitorList from "../pages/VisitorList";
import Newsfeed from "../pages/Newsfeed";


const Stack = createStackNavigator();
function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home Page">
        <Stack.Screen name="Home Page" component={HomePage} />

        <Stack.Screen name="Visitor Entry" component={VisitorEntry} />

        <Stack.Screen name="Visitor List" component={VisitorList} />

        <Stack.Screen name="Latest News" component={Newsfeed} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;