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
import { Video } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import LoadingComponent from '../Components/LoadingComponent';

const VideoPlayerComponent = ( props ) => {

    const _isMountedRef = React.useRef(true);
    const [update, setUpdate] = React.useState();
    const forceUpdate = React.useCallback(() => setUpdate({}), []);
    const [playbackStatus, setPlaybackStatus] = React.useState({});
    const [isPortrait, setIsPortrait] = React.useState(true);
    const [inFullscreen, setInFullsreen] = React.useState(false)
    const videoPlayerRef = React.useRef();
    
    React.useEffect(() => {
        _isMountedRef.current = true;
        if( _isMountedRef.current ){
            console.log("_isMountedRef.current", _isMountedRef.current);
        }
        //cleanup
        return () => { 
            _isMountedRef.current = false; 
            console.log("cleanup", _isMountedRef.current);
        };
    }, [ props ]);

    React.useEffect(() => {
        console.log("Mount ==================================");
        //cleanup
        return () => { 
            console.log("Unmount ==================================");
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
    }, []);

    const _unloadSoundObject = React.useCallback( async () => {
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
    
    return (
        <React.Fragment>
            <VideoPlayer
                videoProps={{
                    ref: (component) => {_handleVideoPlayerRef(component)},
                    // onPlaybackStatusUpdate: (onPlaybackStatus) => {_onPlaybackStatusUpdate(onPlaybackStatus)}, 
                    shouldPlay: false,
                    resizeMode: Video.RESIZE_MODE_CONTAIN,
                    // source: videoSource,
                    // rate: 1.0,
                    // volume: 1.0,
                    // isMuted: false,
                    // isLooping: true,
                    ...props.videoProps,
                }}
                errorCallback={(error) => { _errorCallbackHandler(error) }}
                playbackCallback={(onPlaybackStatus) => {_onPlaybackStatusUpdate(onPlaybackStatus)}}
                defaultControlsVisible={false}
                timeVisible={true}
                textStyle={{}}
                slider={{visible: true}}
                activityIndicator={{}}
                // animation={{ fadeInDuration: 200, fadeOutDuration: 1000 }}
                style={{
                    videoBackground: {}
                }}
                // icon={{}}
                fullscreen={{inFullscreen: true}}
                //////////////////////////////////////////////////////////////
                // fullscreen={{
                //     inFullscreen: inFullscreen2,
                //     enterFullscreen: async () => {
                //       setStatusBarHidden(true, 'fade')
                //       setInFullsreen2(!inFullscreen2)
                //       await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT)
                //       refVideo2.current.setStatusAsync({
                //         shouldPlay: true,
                //       })
                //     },
                //     exitFullscreen: async () => {
                //       setStatusBarHidden(false, 'fade')
                //       setInFullsreen2(!inFullscreen2)
                //       await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT)
                //     },
                //   }}
                //   style={{
                //     videoBackgroundColor: 'black',
                //     height: inFullscreen2 ? Dimensions.get('window').width : 160,
                //     width: inFullscreen2 ? Dimensions.get('window').height : 320,
                //   }}
                ///////////////////////////////////////////////////////////////
                {...props.playerProps}
            />
        </React.Fragment>
    );
}

const colors = Colors;
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    player: {
        flex: 1
    }
});

export default VideoPlayerComponent;

