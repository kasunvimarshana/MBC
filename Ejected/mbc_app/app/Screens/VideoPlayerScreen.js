import React, { Component } from 'react';
import { 
    StyleSheet,
    View,
    SafeAreaView, 
    BackHandler
} from 'react-native';
import { 
    Colors
} from 'react-native-paper';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import * as ScreenOrientation from 'expo-screen-orientation';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import YoutubePlayerComponent from '../Components/YoutubePlayerComponent';
import VideoPlayerComponent from '../Components/VideoPlayerComponent';

class VideoPlayerScreen extends Component {

    state = {};
    _isMounted = false;

    constructor( props ) {
        super( props );
        this.state = {
            isPortrait: true
        };
    }

    UNSAFE_componentWillMount() {}

    componentDidMount() {
        this._isMounted = true;
        this._activate();
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.backOnPressHandler);
    }

    componentWillUnmount() {
        // Clean up listener
        this._isMounted = false;
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state, callback) => {
            return;
        };
        this._deactivate();
        if( this.backHandler !== null ){
            //BackHandler.removeEventListener('hardwareBackPress', this.backOnPressHandler);
            this.backHandler.remove();
        }
    }
    
    _renderVideoPlayer = ( playerProps ) => {
        let tempPlayer = (
            <VideoPlayerComponent {...playerProps}/>
        );
        return tempPlayer;
    };

    _renderYoutubePlayer = ( playerProps ) => {
        let tempPlayer = (
            <YoutubePlayerComponent {...playerProps}/>
        );
        return tempPlayer;
    }

    _renderPlayer = () => {
        let tempPlayer = null;
        let _playerProps = new Object();
        const { video, ...etc } = this.props.route.params;
        if( (video) && ( String(video.type).localeCompare("youtube") === 0) ){
            _playerProps.sourceData = video.video_uri;
            tempPlayer = this._renderYoutubePlayer(_playerProps);
        }else{
            _playerProps.sourceData = {uri: video.video_uri};
            tempPlayer = this._renderVideoPlayer(_playerProps);
        }
        return tempPlayer;
    }

    _activate = () => {
        activateKeepAwake(); 
    };

    _deactivate = () => {
        deactivateKeepAwake(); 
    };

    backOnPressHandler = () => {
        //this.goBack();
        // return true;
    }

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
        backgroundColor: '#EAEAEC'
    },

    contentContainer: {
        flex: 1,
        // paddingTop: StatusBar.currentHeight || 0,
        // paddingTop: Constants.statusBarHeight || StatusBar.currentHeight || 0,
        // flexDirection: 'column',
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

export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayerScreen);