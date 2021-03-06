import React, { Component } from 'react';
import { 
    StyleSheet,
    View,
    SafeAreaView
} from 'react-native';
import { 
    Colors
} from 'react-native-paper';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { Video } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import * as ScreenOrientation from 'expo-screen-orientation';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import YoutubePlayer from '../Components/YoutubePlayer';

class VideoPlayerScreen extends Component {

    state = {};
    _isMounted = false;

    constructor( props ) {
        super( props );
        this.state = {
            isPortrait: true
        };

        this.videoPlayerRef = React.createRef();
    }

    _handleVideoPlayerRef = (component) => {
        this.videoPlayerRef = component;
    }

    getSelectedVideo = () => {
        const { video } = this.props.route.params;
        video.uri = {uri: video.video_uri};
        return video;
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

    _renderVideoPlayer = ( video ) => {
        return (
            <VideoPlayer
                videoProps={{
                    shouldPlay: false,
                    resizeMode: Video.RESIZE_MODE_CONTAIN,
                    source: video.uri,
                    rate: 1.0,
                    volume: 1.0,
                    isMuted: false,
                    isLooping: false,
                    videoRef: this._handleVideoRef,
                }}
                isPortrait={this.state.isPortrait}
                playFromPositionMillis={0}
                inFullscreen={true}
                debug={false}
                errorCallback={(error) => { this.errorCallbackHandler(error) }}
            />
        );
    }

    _renderYoutubePlayer = ( video ) => {
        return (
            <YoutubePlayer
                videoId={video.video_uri}
            />
        );
    }

    _renderPlayer = () => {
        const video = this.getSelectedVideo();
        //console.log('video', video);
        if( (video) && ( String(video.type).localeCompare("youtube") === 0) ){
            return this._renderYoutubePlayer(video);
        }else{
            return this._renderVideoPlayer(video);
        }
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
        backgroundColor: "#EAEAEC"
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

export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayerScreen);