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
        color: colors.text
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
        color: colors.text,
        backgroundColor: colors.TiffanyBlue,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
    },

    profileHeaderTextCircle: {
        fontSize: 25, 
        color: colors.text
    },

    profileHeaderText: {
        color: colors.text,
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
        color: colors.text
    }

});

export default DrawerContentComponent;