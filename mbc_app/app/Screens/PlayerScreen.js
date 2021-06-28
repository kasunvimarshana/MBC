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
import { Video } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import * as ScreenOrientation from 'expo-screen-orientation';

const logoImage = require('../Assets/logo-removebg.png');

class PlayerScreen extends Component {

    state = {};

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

    onErrorHandler = ( error ) => {
        console.log('onErrorHandler', error);
    }

    errorCallbackHandler = ( error ) => {
        //console.error('Error: ', error.message, error.type, error.obj);
        console.error('errorCallbackHandler', error);
    }

    onPlaybackStatusUpdateHandler = ( playbackStatus ) => {
        console.error('onPlaybackStatusUpdateHandler', playbackStatus);
    }

    onOrientationChangeListner = ( param ) => {
        //console.log('onOrientationChangeListner', param);
        this.orientationHandler( param );
    }

    orientationHandler = ( param ) => {
        const { width, height } = param.window;
        const isLandscape = width > height;
        this.setState({ isPortrait: !isLandscape });
        this.switchToDefaultOrientation();
    }

    onFullscreenUpdateHandler = async () => {
        await ScreenOrientation.lockAsync( 
            this.state.isPortrait ? 
            ScreenOrientation.OrientationLock.LANDSCAPE_LEFT : 
            ScreenOrientation.OrientationLock.PORTRAIT 
        );
        this.setState({ isPortrait: !isLandscape });
    }

    /*
    onFullscreenUpdate = async ({fullscreenUpdate}) => {
        if (Platform.OS === 'android') {
            switch (fullscreenUpdate) {
                case Video.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT:
                    await ScreenOrientation.unlockAsync();
                    break;
                case Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS:
                    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
                    break;
            }
        }
    }

    showVideoInFullscreen = async () => { await videoPlayerRef.current.presentFullscreenPlayer(); }
    */


    /*
    UNSAFE_componentWillMount() {
        this.screenOrientationSubscription = ScreenOrientation.addOrientationChangeListener(this.onOrientationChangeListner);
    }
    */

    componentDidMount() {
        //ScreenOrientation.allow(ScreenOrientation.Orientation.ALL);
        //Dimensions.addEventListener('change', this.onOrientationChangeListner);
    }

    componentWillUnmount() {
        //ScreenOrientation.removeOrientationChangeListener(this.screenOrientationSubscription);
        //ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);
        //Dimensions.removeEventListener('change', this.onOrientationChangeListner);
    }

    switchToLandscape = async () => {
        console.log('switchToLandscape');
        //ScreenOrientation.allow(ScreenOrientation.Orientation.LANDSCAPE);
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }

    switchToPortrait = async () => {
        console.log('switchToPortrait');
        //ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }

    switchToDefaultOrientation = async () => {
        console.log('switchToDefaultOrientation');
        ScreenOrientation.unlockAsync();
    }

    _renderVideoPlayer = ( video ) => {
        const icon = (name, size = 36) => () => (
            <Ionicons
                name={name}
                size={size}
                color={Colors.teal500}
                style={{ textAlign: 'center' }}
            />
        );
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
                    //useNativeControls: true,
                    videoRef: this._handleVideoRef,
                    //onError: (error) => { this.onErrorHandler(error) },
                    //onPlaybackStatusUpdate: (status) => { this.onPlaybackStatusUpdateHandler(status) },
                    //onReadyForDisplay: ( params ) => {
                    //    params.naturalSize.orientation = "landscape";
                    //    console.log("params---->", params.naturalSize.orientation);
                    //}
                }}
                //playIcon={icon('ios-play-outline')}
                //pauseIcon={icon('ios-pause-outline')}
                //fullscreenEnterIcon={icon('ios-expand-outline', 28)}
                //fullscreenExitIcon={icon('ios-contract-outline', 28)}
                //textStyle={{
                //    color: Colors.teal500,
                //    fontSize: 12,
                //}}
                //showFullscreenButton={true}
                isPortrait={this.state.isPortrait}
                //switchToLandscape={() => {this.switchToLandscape}}
                //switchToPortrait={() => {this.switchToPortrait}}
                playFromPositionMillis={0}
                inFullscreen={true}
                debug={false}
                errorCallback={(error) => { this.errorCallbackHandler(error) }}
            />
        );
    }

    _renderYoutubePlayer = ( video ) => {}

    _renderPlayer = () => {
        const video = this.getSelectedVideo();
        console.log('video', video);

        if( (video) && ( String(video.type).localeCompare("youtube") === 0) ){
            console.log("test youtube ::::::::::");
        }else{
            console.log("test ::::::::::");
            return this._renderVideoPlayer(video);
        }
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

/*
<VideoPlayer
                            videoProps={{
                                shouldPlay: false,
                                resizeMode: Video.RESIZE_MODE_CONTAIN,
                                source: {
                                    uri: 'http://41.216.229.205:8080/live/livestream/index.m3u8',
                                },
                                rate: 1.0,
                                volume: 1.0,
                                isMuted: false,
                                isLooping: false,
                                useNativeControls: true
                            }}
                            inFullscreen={true}
                            showFullscreenButton={false}
                            videoRef={(ref) => this.videoPlayerRef = ref}
                        />
*/

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight || 0,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: Colors.lightBlueA100
    },
    contentContainer: {
        flex: 1
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

export default connect(mapStateToProps, mapDispatchToProps)(PlayerScreen);