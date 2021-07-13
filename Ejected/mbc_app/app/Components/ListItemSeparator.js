import * as React from 'react';
import { 
    StyleSheet,
    View,
    TouchableOpacity,
    StatusBar,
    Dimensions
} from 'react-native';
import { 
    Colors,
    Text,
    ActivityIndicator 
} from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';

const ListItemSeparator = () => {
    return (
        <View
            style={styles.separator}
        />
    );
};

const styles = StyleSheet.create({
    separator: {
        width: '100%',
        height: 0.5,
        backgroundColor: Colors.red300
    }
});

export default ListItemSeparator;