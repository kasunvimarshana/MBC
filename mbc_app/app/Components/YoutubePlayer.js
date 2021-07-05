import React from 'react';
import { 
    StyleSheet,
    View,
    Platform,
    Pressable,
    Dimensions
} from 'react-native';
import { 
    Colors,
    Text 
} from 'react-native-paper';
import ReactNativeYoutubeIframe from "react-native-youtube-iframe";
import LoadingComponent from '../Components/LoadingComponent';

const YoutubePlayer = ( props ) => {

    const { videoId } = props;

    const _isMountedRef = React.useRef(true);
    const [update, setUpdate] = React.useState();
    const forceUpdate = React.useCallback(() => setUpdate({}), []);
    const playerRef = React.useRef();
    const [playing, setPlaying] = React.useState(false);
    const [isOnReady, setIsOnReady] = React.useState(false);
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

    // const [elapsed, setElapsed] = React.useState(0);
    // React.useEffect(() => {
    //     const interval = setInterval(async () => {
    //         const elapsed_sec = await playerRef.current.getCurrentTime();
    //         // calculations
    //         const elapsed_ms = Math.floor(elapsed_sec * 1000);
    //         const ms = elapsed_ms % 1000;
    //         const min = Math.floor(elapsed_ms / 60000);
    //         const seconds = Math.floor((elapsed_ms - min * 60000) / 1000);
    //         const elapsed_str = (
    //             min.toString().padStart(2, '0') 
    //             + ':' 
    //             + seconds.toString().padStart(2, '0') 
    //             + ':' 
    //             + ms.toString().padStart(3, '0')
    //         );
    //         setElapsed(elapsed_str, console.log("elapsed_str", elapsed_str));
    //     }, 100);
    //     return () => {
    //         clearInterval(interval);
    //     };
    // }, []);
    const onChangeStateHandler = React.useCallback((state) => {
        // console.log("state", state);
        if (state === "ended") {
            setPlaying(false);
        }
    }, []);
    const togglePlaying = React.useCallback(() => {
        setPlaying((prev) => !prev);
    }, []);
    const youtubeMeta = async ( video_id ) => {
        let meta = await getYoutubeMeta( video_id );
        return meta;
    }
    const INJECTED_JAVASCRIPT = `(function() {})();`;

    // const INJECTED_JAVASCRIPT = `(function() { 
    //     const meta = document.createElement('meta'); 
    //     meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'); 
    //     meta.setAttribute('name', 'viewport'); 
    //     document.getElementsByTagName('head')[0].appendChild(meta); 
    // })();`;

    // const INJECTED_JAVASCRIPT = `(function() { 
    //     var css = '.mejs__mediaelement iframe, iframe { pointer-events: none; } .toolbar{ display: none; }';
    //     var head = document.head || document.getElementsByTagName('head')[0];
    //     var style = document.createElement('style');
    //     style.type = 'text/css';
    //     if (style.styleSheet){
    //         // This is required for IE8 and below.
    //         style.styleSheet.cssText = css;
    //     } else {
    //         style.appendChild(document.createTextNode(css));
    //     }
    //     head.appendChild(style);
    // })();`;

    _renderLoadingScreen = ( isAnimating = true ) => {
        return (
            <LoadingComponent 
                animating={isAnimating} 
                color={colors.red800} 
                size='large'
            />
        );
    }

    const _onReadyHandler = () => {
        setIsOnReady(true, console.log("setIsOnReady", true));
    }

    return (
        <Pressable
            // onPress={() => {
            //     // handle or ignore
            // }}
            // onLongPress={() => {
            //     // handle or ignore
            // }}
            style={styles.container}
        >
            <View 
                // pointerEvents="none"
            >
                {
                    ( isOnReady !== true ) && _renderLoadingScreen( !isOnReady )
                }
                {
                    <ReactNativeYoutubeIframe
                        ref={playerRef}
                        height={width}
                        play={playing}
                        videoId={videoId}
                        onChangeState={onChangeStateHandler}
                        webViewProps={{
                            renderToHardwareTextureAndroid: true,
                            androidLayerType: (Platform.OS === 'android' && Platform.Version <= 22) ? 'hardware' : 'none',
                            allowsFullscreenVideo: true,
                            injectedJavaScript: INJECTED_JAVASCRIPT,
                            // originWhitelist: ['*'],
                            // javaScriptEnabled: true,
                            // domStorageEnabled: true,
                        }}
                        initialPlayerParams={{
                            controls: true,
                            loop: false,
                            rel: false,
                            iv_load_policy: 3
                        }}
                        // forceAndroidAutoplay={true}
                        onReady={() => {_onReadyHandler()}}
                        onError={(error) => {console.log("error", error)}}
                    />
                }
            </View>
        </Pressable>
    );
}

const colors = Colors;
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: colors.black
    }
});

export default YoutubePlayer;

