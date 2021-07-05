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

    const _onPlaybackStatusUpdate = React.useCallback((_playbackStatus) => {
        console.log("_playbackStatus", _playbackStatus);
        if (!_playbackStatus.isLoaded) {
            if (_playbackStatus.error) {
                console.log("error", _playbackStatus.error);
            }
        }

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
        if( (videoPlayerRef) && (videoPlayerRef.current) ){
            videoPlayerRef.current.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);
        }
    }, []);

    const _errorCallbackHandler = React.useCallback((error) => {
        //console.error('Error: ', error.message, error.type, error.obj);
        console.log('errorCallbackHandler', error);
    }, []);
    
    return (
        <React.Fragment>
            <VideoPlayer
                videoProps={{
                    ref: (component) => { _handleVideoPlayerRef(component) },
                    shouldPlay: false,
                    resizeMode: Video.RESIZE_MODE_CONTAIN,
                    // source: videoSource,
                    rate: 1.0,
                    volume: 1.0,
                    isMuted: false,
                    isLooping: false,
                    ...props.videoProps
                }}
                isPortrait={isPortrait}
                playFromPositionMillis={0}
                inFullscreen={true}
                debug={false}
                errorCallback={(error) => { _errorCallbackHandler(error) }}
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

