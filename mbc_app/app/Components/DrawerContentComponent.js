import * as React from 'react';
import { 
    StyleSheet,
    View,
    Platform,
    Dimensions,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { 
    Colors,
    Text
} from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer';

const DrawerContentComponent = ( props ) => {
    // const filteredProps = {...props};

    const hiddenRouteNames = ["PlayerRoutes"];

    const filteredProps = {
        ...props,
        state: {
            ...props.state,
            routeNames: props.state.routeNames.filter((routeName) => {
                return (hiddenRouteNames.includes(routeName) === false);
            }),
            routes: props.state.routes.filter((route) => {
                return (hiddenRouteNames.includes(route.name) === false);
            })
        }
    };

    const goToRadioScreen_1 = () => {
        return filteredProps.navigation.replace('DrawerNavigatorRoutes', {
            screen: 'PlayerRoutes',
            initial: true,
            params: {
                screen: 'AudioPlayerScreeen',
                initial: true,
                params: {
                    audio: {audio_uri: 'http://154.66.125.13:88/broadwavehigh.mp3?src=1'}
                }
            }
        });
    }

    const goToRadioScreen_2 = () => {
        return filteredProps.navigation.replace('DrawerNavigatorRoutes', {
            screen: 'PlayerRoutes',
            initial: true,
            params: {
                screen: 'AudioPlayerScreeen',
                initial: true,
                params: {
                    audio: {audio_uri: 'http://154.66.125.13:86/broadwavehigh.mp3?src=1'}
                }
            }
        });
    }

    return (
        <View style={styles.sideMenuContainer}>
            {
                (
                    <React.Fragment>
                    {/* <View style={styles.profileHeader}>
                        <View style={styles.profileHeaderPicCircle}>
                            <Text style={styles.profileHeaderTextCircle}>
                                {''.charAt(0)}
                            </Text>
                        </View>
                        <Text style={styles.profileHeaderText}>{''}</Text>
                    </View>
                    <View style={styles.profileHeaderLine} /> */}
                    </React.Fragment>
                )
            }

            <DrawerContentScrollView {...filteredProps}>
                {
                    (<DrawerItemList {...filteredProps} />)
                }

                {
                    <DrawerItem
                        label={({color}) => <Text style={styles.drawerItemLabelText}> Radio 1 </Text>}
                        onPress={() => { goToRadioScreen_1() }}
                        // focused={
                        //     filteredProps.state.routes.findIndex((e) => e.name === filteredProps.route.name) === filteredProps.state.index
                        // }
                        // activeTintColor={colors.notification}
                    />
                }

                {
                    <DrawerItem
                        label={({color}) => <Text style={styles.drawerItemLabelText}> Radio 2 </Text>}
                        onPress={() => { goToRadioScreen_2() }}
                        // focused={
                        //     filteredProps.state.routes.findIndex((e) => e.name === filteredProps.route.name) === filteredProps.state.index
                        // }
                        // activeTintColor={colors.notification}
                    />
                }
            </DrawerContentScrollView>
        </View>
    );
};

const colors = Colors;

const styles = StyleSheet.create({
    container: {},

    sideMenuContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: colors.background,
        paddingTop: 40,
        color: colors.black
    },

    profileHeader: {
        flexDirection: "row",
        backgroundColor: colors.background,
        padding: 15,
        textAlign: "center",
    },

    profileHeaderPicCircle: {
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        color: colors.black,
        backgroundColor: colors.TiffanyBlue,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
    },

    profileHeaderTextCircle: {
        fontSize: 25, 
        color: colors.black
    },

    profileHeaderText: {
        color: colors.black,
        alignSelf: "center",
        paddingHorizontal: 10,
        fontWeight: "bold",
    },

    profileHeaderLine: {
        height: 1,
        marginHorizontal: 20,
        backgroundColor: colors.primary,
        marginTop: 15,
    },

    drawerItemLabelText: {
        color: colors.black
    }

});

export default DrawerContentComponent;