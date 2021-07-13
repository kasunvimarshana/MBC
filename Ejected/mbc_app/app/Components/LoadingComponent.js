import * as React from 'react';
import { 
    StyleSheet,
    View
} from 'react-native';
import { 
    Colors,
    ActivityIndicator 
} from 'react-native-paper';

const LoadingComponent = ( props ) => {
    const { style, ...etc } = props;
    return (
        <ActivityIndicator 
            animating={true} 
            color={colors.red800} 
            size='large'
            style={[styles.activityIndicator, style]}
            {...etc}
        />
    );
};

const colors = Colors;

const styles = StyleSheet.create({
    activityIndicator: {
        flex: 1,
        position: 'absolute',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        backgroundColor: colors.black
    }
});

export default LoadingComponent;