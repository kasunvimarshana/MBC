//import 'react-native-gesture-handler';
import React from 'react';
import { 
    StyleSheet,
    Platform,
    Dimensions,
    View
} from 'react-native';
//import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { 
    Colors,
    Text
} from 'react-native-paper';

import DrawerContentComponent from '../Components/DrawerContentComponent';
import VideoListScreen from '../Screens/VideoListScreen';
import VideoPlayerScreen from '../Screens/VideoPlayerScreen';
import AudioPlayerScreeen from '../Screens/AudioPlayerScreeen';
import LiveStreamVideoPlayerScreen from '../Screens/LiveStreamVideoPlayerScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// VideoList
const videoListRoutes = (props) => {
    const { navigation } = props;
    const _videoListScreen = ( _props = {} ) => {
        //_props = Object.assign({}, _props);
        return (<VideoListScreen {..._props}/>);
    };

    return (
        <Stack.Navigator 
            initialRouteName="VideoListScreen"
            // headerMode="screen"
            screenOptions={(screenOptionProps) => {
                const { route, navigation } = screenOptionProps;
                return ({
                    headerShown: false,
                    gestureEnabled: true,
                    cardOverlayEnabled: true,
                    // headerLeft: (headerLeftProps) => (<></>),
                });
            }}
            // mode= "card"
        >
            <Stack.Screen
                name="VideoListScreen"
                component={_videoListScreen}
                options={(optionProps) => {
                    const { navigation } = optionProps;
                    return ({
                        headerShown: false,
                        title: null
                    })
                }}
                // listeners={(listenerProps) => {
                //     const { navigation, route } = listenerProps;
                //     return ({});
                // }}
            />
        </Stack.Navigator>
    );
};

// Player
const playerRoutes = (props) => {
    const { navigation } = props;
    // videoPlayerScreen
    const _videoPlayerScreen = ( _props = {} ) => {
        //_props = Object.assign({}, _props);
        return (<VideoPlayerScreen {..._props}/>);
    };

    // audioPlayerScreen
    const _audioPlayerScreen = ( _props = {} ) => {
        //_props = Object.assign({}, _props);
        return (<AudioPlayerScreeen {..._props}/>);
    }

    // liveStreamVideoPlayerScreen
    const _liveStreamVideoPlayerScreen = ( _props = {} ) => {
        //_props = Object.assign({}, _props);
        return (<LiveStreamVideoPlayerScreen {..._props}/>)
    }

    return (
        <Stack.Navigator 
            initialRouteName="VideoPlayerScreen"
            // headerMode="screen"
            screenOptions={(screenOptionProps) => {
                const { route, navigation } = screenOptionProps;
                return ({
                    headerShown: false,
                    gestureEnabled: true,
                    cardOverlayEnabled: true,
                    // headerLeft: (headerLeftProps) => (<></>),
                });
            }}
            // mode= "card"
        >
            <Stack.Screen
                name="VideoPlayerScreen"
                component={_videoPlayerScreen}
                options={(optionProps) => {
                    const { navigation } = optionProps;
                    return ({
                        headerShown: false,
                        title: null
                    })
                }}
                // listeners={(listenerProps) => {
                //     const { navigation, route } = listenerProps;
                //     return ({});
                // }}
            />

            <Stack.Screen
                name="AudioPlayerScreeen"
                component={_audioPlayerScreen}
                options={(optionProps) => {
                    const { navigation } = optionProps;
                    return ({
                        headerShown: false,
                        title: null
                    })
                }}
                // listeners={(listenerProps) => {
                //     const { navigation, route } = listenerProps;
                //     return ({});
                // }}
            />

            <Stack.Screen
                name="LiveStreamVideoPlayerScreen"
                component={_liveStreamVideoPlayerScreen}
                options={(optionProps) => {
                    const { navigation } = optionProps;
                    return ({
                        headerShown: false,
                        title: null
                    })
                }}
                // listeners={(listenerProps) => {
                //     const { navigation, route } = listenerProps;
                //     return ({});
                // }}
            />
        </Stack.Navigator>
    );
};

const DrawerNavigator = ( props ) => {
    const { navigation } = props;
    return (
        <Drawer.Navigator
            // drawerContentOptions={{
            //     activeTintColor: colors.notification,
            //     color: colors.notification,
            //     itemStyle: styles.drawerContentItemStyle,
            //     labelStyle: styles.drawerContentLabelStyle,
            // }}
            // screenOptions={{headerShown: false}}
            drawerContent={(drawerContentProps) => { 
                // const { state, ...rest } = drawerContentProps;
                // const newState = {...state};
                return (<DrawerContentComponent {...drawerContentProps} navigation={navigation}/>) 
            }}
            initialRouteName="VideoListRoutes" 
            openByDefault={false}
            drawerPosition="left"
        >
            <Drawer.Screen
                name="VideoListRoutes"
                options={{drawerLabel: "Play List", unmountOnBlur: true}}
                component={videoListRoutes}
            />

            <Drawer.Screen
                name="PlayerRoutes"
                options={{drawerLabel: "Label", unmountOnBlur: true}}
                component={playerRoutes}
            />
      </Drawer.Navigator>
    );
};

const colors = Colors;

const styles = StyleSheet.create({
    container: {},

    drawerContentItemStyle: {
        marginVertical: 5, 
        color: colors.text
    },

    drawerContentLabelStyle: {
        color: colors.text
    }
});

export default DrawerNavigator;