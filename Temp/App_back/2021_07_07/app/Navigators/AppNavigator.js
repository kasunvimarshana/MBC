//import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet, StatusBar, useWindowDimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { 
    Colors,
    // Text
} from 'react-native-paper';
import DrawerNavigator from './DrawerNavigator';
import NavigationHeaderLeftComponent from '../Components/NavigationHeaderLeftComponent';

const Stack = createStackNavigator();

const AppNavigator = ( props ) => {

    const _isMountedRef = React.useRef(false);

    React.useEffect(() => {
        _isMountedRef.current = true;
        
        if( _isMountedRef.current ){ }

        //cleanup
        return () => { _isMounted = false };
    }, []);

    return (
        <NavigationContainer 
            //ref={navigationRef} 
            //fallback={<Text>Loading...</Text>}
        >
            <Stack.Navigator 
                initialRouteName="DrawerNavigatorRoutes"
                screenOptions={(screenOptionProps) => {
                    const { route, navigation } = screenOptionProps;
                    return ({
                        // headerMode: "screen",
                        // headerTintColor: colors.notification,
                        // headerTitleStyle: {
                        //     fontWeight: "bold",
                        // },
                        // headerShown: false,
                        // gestureEnabled: true,
                        // cardOverlayEnabled: true,
                        // headerLeft: (headerLeftProps) => (<></>),
                        // header: (headerProps) => (<></>),
                    });
                }}
                mode= "card"
            >
                <Stack.Screen
                    name="DrawerNavigatorRoutes"
                    component={DrawerNavigator}
                    options={(optionProps) => {
                        const { navigation } = optionProps;
                        return ({
                            headerShown: true,
                            transitionSpec: {
                                open: springAnimationConfig,
                                close: springAnimationConfig,
                            },
                            headerStyleInterpolator: forFade,
                            title: null,
                            headerLeft: (headerLeftProps) => (<NavigationHeaderLeftComponent {...headerLeftProps} navigation={navigation}/>),
                        })
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const colors = Colors;

const springAnimationConfig = {
    animation: 'spring',
    config: {
        stiffness: 1000,
        damping: 500,
        mass: 3,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
    }
};

const forFade = ({ current, next }) => {
    const opacity = Animated.add(
        current.progress,
        next ? next.progress : 0
    ).interpolate({
        inputRange: [0, 1, 2],
        outputRange: [0, 1, 0],
    });

    return {
        leftButtonStyle: { opacity },
        rightButtonStyle: { opacity },
        titleStyle: { opacity },
        backgroundStyle: { opacity },
    };
};

export default AppNavigator;