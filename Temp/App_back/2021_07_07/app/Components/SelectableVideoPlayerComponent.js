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
import Constants from 'expo-constants';
import YoutubePlayer from './YoutubePlayer';
import VideoPlayerComponent from './VideoPlayerComponent';

const SelectableVideoPlayerComponent = ( props ) => {
    const _isMountedRef = React.useRef(true);
    const [update, setUpdate] = React.useState();
    const forceUpdate = React.useCallback(() => setUpdate({}), []);
    const [player, setPlayer] = React.useState( null );
    
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
        console.log("Mount");
        //cleanup
        return () => { 
            console.log("Unmount");
        };
    }, []);

    React.useEffect(() => {
        console.log("props +");
        const tempPlayer = _renderPlayer();
        setPlayer( tempPlayer );
        //cleanup
        return () => { 
            console.log("props -");
        };
    }, [ props ]);

    const _renderVideoPlayer = React.useCallback(( video, playerProps ) => {
        let tempPlayer = (
            <VideoPlayerComponent
                playerProps={{
                    source: video.uri,
                    ...playerProps
                }}
            />
        );
        return tempPlayer;
    }, []);

    const _renderYoutubePlayer = React.useCallback(( video, playerProps ) => {
        let tempPlayer = (
            <YoutubePlayer
                videoId={video.videoId}
                playerProps={...playerProps}
            />
        );
        return tempPlayer;
    }, []);

    const _renderPlayer = React.useCallback(() => {
        let tempPlayer = null;
        // let _playerProps = new Object();
        const { video, ...playerProps } = props;
        let _playerProps = {...playerProps};
        if( (video) && ( String(video.type).localeCompare("youtube") === 0) ){
            playerProps.sourceData = video.video_uri;
            tempPlayer = _renderYoutubePlayer(playerProps);
        }else{
            playerProps.sourceData = {uri: video.video_uri};
            tempPlayer = _renderVideoPlayer(playerProps);
        }
        return tempPlayer;
    }, []);

    return (
        <React.Fragment>
            {(player !== null) && (player)}
        </React.Fragment>
    );
}

const colors = Colors;
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({});

export default SelectableVideoPlayerComponent;