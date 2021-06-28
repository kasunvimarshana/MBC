import * as React from 'react';
import { StyleSheet, StatusBar, useWindowDimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PlayerScreen from '../Screens/PlayerScreen';
import VideoListScreen from '../Screens/VideoListScreen';

const Stack = createStackNavigator();

function AppNavigator( navigator_props ) {
    return (
        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName="VideoListScreen"
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen 
                    name="VideoListScreen" 
                    component={VideoListScreen} 
                    options={{ 
                        headerTitle: () => null,
                        headerShown: false
                    }}
                />
                <Stack.Screen 
                    name="PlayerScreen" 
                    component={PlayerScreen} 
                    options={{ 
                        headerTitle: () => null,
                        headerShown: false 
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;