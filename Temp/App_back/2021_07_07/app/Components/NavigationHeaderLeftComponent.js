import * as React from 'react';
import { 
    StyleSheet,
    View,
    Platform,
    Dimensions,
    TouchableOpacity,
    Image
} from 'react-native';
import { 
    Colors,
    Text
} from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { CommonActions, DrawerActions } from '@react-navigation/native';

const NavigationHeaderLeftComponent = ( props ) => {

    // const goBackHandler = () => {
    //     console.log("goBackHandler");
    //     props.navigationProps.replace('MenuRoutes', {
    //         screen: 'MenuScreen',
    //         initial: true,
    //         params: {}
    //     });
    // };

    const toggleDrawerHandler = () => {
        props.navigation.dispatch(DrawerActions.toggleDrawer());
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleDrawerHandler}>
                <View style={styles.view}>
                    {<FontAwesome name="bars" size={25} color={colors.AshGray} />}
                </View>
            </TouchableOpacity>
        </View>
    );

};

const colors = Colors;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row"
    },

    view: {
        marginLeft: 5
    }
});

export default NavigationHeaderLeftComponent;