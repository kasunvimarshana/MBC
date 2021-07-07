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
import { Video } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import * as ScreenOrientation from 'expo-screen-orientation';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';

import { getLiveStreams } from '../Store/Actions/LiveStreamAction';
import LoadingComponent from '../Components/LoadingComponent';

class LiveStreamVideoPlayerScreen extends Component {

    state = {};
    _isMounted = false;

    constructor( props ) {
        super( props );
        this.state = {
            isPortrait: true,
            playbackStatus: {},
            video: null,
            isOnReady: false,
        };

        this.videoPlayerRef = React.createRef();
    }

    _fetchData = async () => {
        let _data = null;
        const { video } = this.props.route.params;
        try{
            _data = await this.props.ui_getLiveStreams( video.name );
        }catch( error ){
            console.log("error", error);
        }
        return _data;
    }

    loadData = async () => {
        let video = null;
        video = await this._fetchData();
        video = video.filter(x => typeof x!== undefined).shift();
        this.setState({ video: video }, console.log('video', video));
    }

    _handleVideoPlayerRef = (component) => {
        this.videoPlayerRef.current = component;
        if( (this.videoPlayerRef) && (this.videoPlayerRef.current) ){
            this.videoPlayerRef.current.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
        }
    }

    getSelectedVideo = () => {
        const { video } = this.state;
        video.video_uri = video.uri;
        video.uri = {uri: video.uri};
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

        this.loadData()
        .finally(() => {
            this.setState({ isOnReady: true });
        });
    }

    componentWillUnmount() {
        this._deactivate();
    }

    _onPlaybackStatusUpdate = ( playbackStatus ) => {
        // console.log("playbackStatus", playbackStatus);
        // if (!playbackStatus.isLoaded) {
        //     if (playbackStatus.error) {
        //         console.log("error", playbackStatus.error);
        //     }
        // }
        this.setState((prevState) => {
            return {
                ...prevState,
                playbackStatus: {
                    ...playbackStatus
                }
            }
        });

        if( playbackStatus.isLoaded ){
            console.log("isLoaded", playbackStatus.isLoaded);
            if( playbackStatus.isPlaying ){
                console.log("isPlaying", playbackStatus.isPlaying);
            }else{
                console.log("!isPlaying", !playbackStatus.isPlaying);
            }

            if( playbackStatus.isBuffering ){
                console.log("isBuffering", playbackStatus.isBuffering);
            }else{
                console.log("!isBuffering", !playbackStatus.isBuffering);
            }

            if( playbackStatus.didJustFinish && !playbackStatus.isLooping ){
                console.log("didJustFinish, !isLooping", playbackStatus.didJustFinish, !playbackStatus.isLooping);
            }
        }else{
            console.log("!isLoaded", !playbackStatus.isLoaded);
            if (playbackStatus.error) {
                console.log("error", playbackStatus.error);
            }
        }
    };

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
                    ref: (component) => { this._handleVideoPlayerRef(component) }
                }}
                isPortrait={this.state.isPortrait}
                playFromPositionMillis={0}
                inFullscreen={true}
                debug={false}
                errorCallback={(error) => { this.errorCallbackHandler(error) }}
            />
        );
    }

    _renderPlayer = () => {
        const video = this.getSelectedVideo();
        //console.log('video', video);
        return this._renderVideoPlayer(video);
    }

    _activate = () => {
        activateKeepAwake(); 
    };

    _deactivate = () => {
        deactivateKeepAwake(); 
    };

    _renderLoadingScreen = ( isAnimating = true ) => {
        return (
            <LoadingComponent 
                animating={isAnimating} 
                color={colors.red800} 
                size='large'
            />
        );
    }

    render() {
        return(
            <SafeAreaView style={styles.container}>
                    <View style={styles.contentContainer}>
                        {
                            ( this.state.isOnReady !== true ) && 
                            this._renderLoadingScreen( !this.state.isOnReady )
                        }

                        {
                            ( this.state.isOnReady === true ) && 
                            this._renderPlayer()
                        }
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
    return {
        ui_getLiveStreams: ( name = null ) => dispatch(getLiveStreams( name ))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LiveStreamVideoPlayerScreen);