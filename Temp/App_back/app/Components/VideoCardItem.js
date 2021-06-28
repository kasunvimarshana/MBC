import * as React from 'react';
import { 
    StyleSheet,
    View,
    TouchableOpacity,
    StatusBar,
    Dimensions,
    Animated,
    Easing
} from 'react-native';
import { 
    Colors,
    Text,
    Avatar, 
    Button, 
    Card, 
    Title, 
    Paragraph,
    ActivityIndicator 
} from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';

const logoImage = require('../Assets/logo-removebg.png');

const VideoCardItem = ({item, onPressHandler}) => {

    const featuredImage = (item.image_uri) ? {'uri' : item.image_uri} : logoImage;

    const cardOnPressHandler = () => {
        onPressHandler();
    };

    return (
        <View>
            <TouchableOpacity onPress={ cardOnPressHandler }>
                <Card>
                    <Card.Content>
                        <Title>{item.name}</Title>
                    </Card.Content>
                    <Card.Cover source={featuredImage} />
                    <Card.Content>
                        <Paragraph>{item.description}</Paragraph>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
        </View>
    );
}

/*
<Card>
                <Card.Content>
                    <Title>Card title</Title>
                    <Paragraph>Card content</Paragraph>
                </Card.Content>
                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                <Card.Actions>
                    <Button>Cancel</Button>
                    <Button>Ok</Button>
                </Card.Actions>
            </Card>
*/

export default VideoCardItem;