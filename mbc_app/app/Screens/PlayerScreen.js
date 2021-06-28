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
import YouTubePlayer from 'react-native-youtube';
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

    errorCallbackHandler = ( error ) => {
        //console.error('Error: ', error.message, error.type, error.obj);
        console.error('errorCallbackHandler', error);
    }

    UNSAFE_componentWillMount() {}

    componentDidMount() {}

    componentWillUnmount() {}

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
            <YouTubePlayer
                videoId="KVZ-P-ZI6W4"
                play={true}
                fullscreen={true}
                loop={false}
                onReady={e => this.setState({ isReady: true })}
                onChangeState={e => this.setState({ status: e.state })}
                onChangeQuality={e => this.setState({ quality: e.quality })}
                onError={e => this.setState({ error: e.error })}
                style={{ alignSelf: 'stretch', height: 300 }}
            />
        );
    }

    _renderPlayer = () => {
        const video = this.getSelectedVideo();
        console.log('video', video);

        if( (video) && ( String(video.type).localeCompare("youtube") === 0) ){
            return this._renderYoutubePlayer(video);
        }else{
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