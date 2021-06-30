import React, { Component } from 'react';
import { 
    StyleSheet,
    View,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Platform,
    StatusBar
} from 'react-native';
import { 
    Colors,
    Text,
    Avatar, 
    Button, 
    Card, 
    Title, 
    Paragraph,
    Headline,
    ActivityIndicator 
} from 'react-native-paper';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { Audio } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';

const logoImage = require('../Assets/logo-removebg.png');

class AudioPlayerScreeen extends Component {

    state = {};
    _isMounted = false;

    constructor( props ) {
        super( props );
        this.state = {
            isPortrait: true
        };

        this.audioPlayerRef = React.createRef();
    }

    _handleAudioPlayerRef = (component) => {
        this.audioPlayerRef = component;
    }

    getSelectedAudio = () => {
        const { audio } = this.props.route.params;
        audio.uri = {uri: audio.audio_uri};
        return audio;
    }

    errorCallbackHandler = ( error ) => {
        //console.error('Error: ', error.message, error.type, error.obj);
        console.error('errorCallbackHandler', error);
    }

    UNSAFE_componentWillMount() {}

    componentDidMount() {
        this._isMounted = true;
        this._activate();
    }

    componentWillUnmount() {
        this._deactivate();
    }

    _renderAudioPlayer = ( video ) => {
        return (
          <>
            <Text> Audio Player</Text>
          </>
        );
    }

    _renderPlayer = () => {
        const audio = this.getSelectedAudio();
        //console.log('audio', audio);
        return this._renderAudioPlayer(audio);
    }

    _activate = () => {
        activateKeepAwake(); 
    };

    _deactivate = () => {
        deactivateKeepAwake(); 
    };

    render() {
        return(
            <SafeAreaView style={styles.container}>
                    <View style={styles.contentContainer}>
                        {this._renderPlayer()}
                    </View>
            </SafeAreaView>
        );
    }
}

const colors = Colors;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: colors.lightBlueA100
    },

    contentContainer: {
        flex: 1,
        // paddingTop: StatusBar.currentHeight || 0,
        // paddingTop: Constants.statusBarHeight || StatusBar.currentHeight || 0,
        // flexDirection: "column",
        // justifyContent: 'center',
    },

    player: {
        flex: 1
    }
});

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AudioPlayerScreeen);