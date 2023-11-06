//source: https://javascript.plainenglish.io/bottom-tab-navigation-like-instagram-using-react-native-expo-96dec9279eaa

import React, { useState } from 'react';
import Dashboard from '../screens/DashboardPage/DashboardPage';
import Map from '../screens/MapPage/MapPage';
import WelcomeScreen from '../screens/WelcomePage/WelcomePage';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NavigationContainer } from '@react-navigation/native';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';

// source: https://stackoverflow.com/questions/74719540/how-can-i-remove-the-rounded-shape-around-my-selected-tab-text 

import {
    MD3LightTheme as DefaultTheme,
    Provider as PaperProvider,
  } from "react-native-paper";

const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      secondaryContainer: "#FCD39D",
    },
};

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function Home() {
  return (
    <Tab.Navigator labeled={false} barStyle={{ backgroundColor: '#E77F68' }} activeColor="white">
        <Tab.Screen name="Dashboard" component={Dashboard}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="bus" color={color} size={26}/>
            ),
        }}/>
        <Tab.Screen name="Map" component={Map}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="map-marker" color={color} size={26}/>
            ),
        }}/>
    </Tab.Navigator>
  )
}

export default function Navigator() {
    const [showWelcome, setShowWelcome] = useState(true);
  
    return (
      <NavigationContainer>
        <PaperProvider theme={theme}>
          <Stack.Navigator>
            {showWelcome ? (
              <Stack.Screen
                name="Welcome"
                options={{ headerShown: false }} // Hide the title of the Welcome screen
              >
                {(props) => <WelcomeScreen {...props} setShowWelcome={setShowWelcome} />}
              </Stack.Screen>
            ) : null}
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }} // Hide the title of the Home screen
            />
          </Stack.Navigator>
        </PaperProvider>
      </NavigationContainer>
    );
            }