import React from 'react';
import { 
    StyleSheet,
    Dimensions
} from 'react-native';
import { 
    Colors,
    Text 
} from 'react-native-paper';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Video as VideoPlayer, AVPlaybackStatus } from 'expo-av';
import Constants from 'expo-constants';
import LoadingComponent from '../Components/LoadingComponent';
const logoImage = require('../Assets/logo-removebg.png');

const VideoPlayerComponent = ( props ) => {
    const { sourceData, shouldPlay, ...playerProps } = props;
    const _isMountedRef = React.useRef(true);
    const [update, setUpdate] = React.useState();
    const forceUpdate = React.useCallback(() => setUpdate({}), []);
    const [playbackStatus, setPlaybackStatus] = React.useState({});
    const [isPortrait, setIsPortrait] = React.useState(true);
    const [isFullscreen, setIsFullsreen] = React.useState(true);
    const [videoSourceData, setVideoSourceData] = React.useState( sourceData );
    const [isPlaying, setIsPlaying] = React.useState(shouldPlay);
    const videoPlayerRef = React.useRef();
    
    React.useEffect(() => {
        _isMountedRef.current = true;
        if( _isMountedRef.current ){
            console.log("_isMountedRef.current", _isMountedRef.current);
            let tempVideoSourceData = {uri: props.sourceData?.uri, overrideFileExtensionAndroid: 'm3u8'};
            // setVideoSourceData( tempVideoSourceData, console.log("setVideoSourceData", tempVideoSourceData) );
            // setIsPlaying( props.shouldPlay, console.log("setIsPlaying", props.shouldPlay) );
            Promise.all([setVideoSourceData(tempVideoSourceData), setIsPlaying(props.shouldPlay)])
            .finally(() => {
                _loadVideoObject( false );
            });
        }
        //cleanup
        return () => { 
            _isMountedRef.current = false; 
            console.log("cleanup", _isMountedRef.current);
        };
    }, [ props ]);

    React.useEffect(() => {
        //cleanup
        return () => { 
            console.log("_unloadVideoObject");
            _unloadVideoObject(); 
        };
    }, []);

    const _onPlaybackStatusUpdate = React.useCallback((_playbackStatus) => {
        console.log("_playbackStatus", _playbackStatus);
        // if (!_playbackStatus.isLoaded) {
        //     if (_playbackStatus.error) {
        //         console.log("error", _playbackStatus.error);
        //     }
        // }

        if( _isMountedRef.current === true ){
            setPlaybackStatus(_playbackStatus);
            if( _playbackStatus.isLoaded ){
                // setIsPlaying( _playbackStatus.isPlaying, console.error("setIsPlaying", _playbackStatus.isPlaying) );
            }
        }

        if( _playbackStatus.isLoaded ){
            console.log("isLoaded", _playbackStatus.isLoaded);
            if( _playbackStatus.isPlaying ){
                console.log("isPlaying", _playbackStatus.isPlaying);
            }else{
                console.log("!isPlaying", !_playbackStatus.isPlaying);
            }

            if( _playbackStatus.isBuffering ){
                console.log("isBuffering", _playbackStatus.isBuffering);
            }else{
                console.log("!isBuffering", !_playbackStatus.isBuffering);
            }

            if( _playbackStatus.didJustFinish && !_playbackStatus.isLooping ){
                console.log("didJustFinish, !isLooping", _playbackStatus.didJustFinish, !_playbackStatus.isLooping);
                if( (videoPlayerRef) && (videoPlayerRef.current) ){
                    videoPlayerRef.current.replayAsync();
                    videoPlayerRef.current.setIsLoopingAsync(true);
                }
            }
        }else{
            console.log("!isLoaded", !_playbackStatus.isLoaded);
            if (_playbackStatus.error) {
                console.log("error", _playbackStatus.error);
            }
        }
    }, []);
    
    const _handleVideoPlayerRef = React.useCallback((component) => {
        videoPlayerRef.current = component;
        // if( (videoPlayerRef) && (videoPlayerRef.current) ){
        //     videoPlayerRef.current.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);
        // }
    }, []);

    const _errorCallbackHandler = React.useCallback((error) => {
        //console.error('Error: ', error.message, error.type, error.obj);
        console.log('errorCallbackHandler', error);
        // _loadVideoObject
        _loadVideoObject( true );
    }, []);

    const _unloadVideoObject = React.useCallback( async () => {
        let result = null;
        if( (videoPlayerRef) && (videoPlayerRef.current) ){
            try{
                result = await videoPlayerRef.current.unloadAsync();
            }catch(error){
                console.log("error", error);
            }
        }
        return result;
    }, []);

    const _loadVideoObject = async ( _shouldPlay = false ) => {
        let result = null;
        if( (videoPlayerRef) && (videoPlayerRef.current) ){
            try{
                // result = await videoPlayerRef.current.loadAsync(tempSource, {shouldPlay: true}, downloadFirst = true);
                result = await videoPlayerRef.current.loadAsync(videoSourceData);
                videoPlayerRef.current.setStatusAsync({shouldPlay: _shouldPlay});
                // videoPlayerRef.current.isMuted = false;
                // await videoPlayerRef.current.playAsync();
                if( _shouldPlay === true ){
                    await videoPlayerRef.current.playAsync();
                }
                console.log("_loadVideoObject");
            }catch(error){
                console.log("error", error);
            }
        }
        return result;
    }

    const _renderLoadingScreen = ( isAnimating = true ) => {
        return (
            <LoadingComponent 
                animating={isAnimating} 
                color={colors.red800} 
                size='large'
                style={{backgroundColor: 'rgba(52, 52, 52, 0.8)'}}
            />
        );
    }
    
    return (
        <React.Fragment>
            <VideoPlayer
                ref = {(component) => {_handleVideoPlayerRef(component)}}
                // source = {videoSourceData}
                resizeMode = {VideoPlayer.RESIZE_MODE_CONTAIN}
                useNativeControls = {true}
                style = {styles.videoPlayer}
                // shouldPlay = {isPlaying}
                isLooping = {true}
                // rate = {1.0}
                // volume = {1.0}
                // isMuted = {false}
                usePoster = {true}
                posterSource = {logoImage}
                posterStyle = {styles.posterStyle}
                // progressUpdateIntervalMillis = {1000}
                onPlaybackStatusUpdate = {(onPlaybackStatus) => {_onPlaybackStatusUpdate(onPlaybackStatus)}}
                onReadyForDisplay = {() => console.log("onReadyForDisplay")}
                onFullscreenUpdate = {() => console.log("onFullscreenUpdate")}
                onLoadStart = {() => console.log("onLoadStart")}
                onLoad = {() => console.log("onLoad")}
                onError = {(error) => { _errorCallbackHandler(error) }}
                {...playerProps}
            />
            { ( playbackStatus.isLoaded !== true ) && (_renderLoadingScreen( !playbackStatus.isLoaded )) }
        </React.Fragment>
    );
}

const colors = Colors;
const { width, height } = Dimensions.get('window');

const playerWidth = width;
const playerHeight = width;

const styles = StyleSheet.create({
    videoPlayer: {
        flex: 1,
        backgroundColor: colors.black
    },

    posterStyle: {
        flex: 1, 
        width: '100%', 
        height: '100%', 
        resizeMode: 'contain'
    }
});

export default VideoPlayerComponent;

