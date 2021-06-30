import React, { Component } from 'react';
import { 
    StyleSheet,
    View
} from 'react-native';
import { 
    Colors,
    Text,
    ActivityIndicator 
} from 'react-native-paper';
import { WebView } from 'react-native-webview';


const YoutubePlayer = ( props ) => {

    const { videoId } = props;

    const _renderLoadingScreen = () => {
        return <ActivityIndicator 
                animating={true} 
                color={Colors.red800} 
                size='large'
                style={{
                    flex: 1,
                    position: 'absolute',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: 'auto',
                    marginBottom: 'auto',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    justifyContent: 'center'
                }}
            />
    }

    const INJECTED_JAVASCRIPT = `(function() { 
        const meta = document.createElement('meta'); 
        meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'); 
        meta.setAttribute('name', 'viewport'); 
        document.getElementsByTagName('head')[0].appendChild(meta); 
    })();`;

    return (
        <WebView
            originWhitelist={['*']}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            source={{uri:`https://www.youtube.com/embed/${videoId}?
            rel=0
            &autoplay=1
            &controls=1
            &enablejsapi=1
            &modestbranding=1
            &controls=1
            `}}
            // source={{html: `<iframe 
            //         id="iframe-id"
            //         width = "100%" 
            //         height = "50%" 
            //         src = "https://www.youtube.com/embed/${videoId}" 
            //         title = "YouTube video player" 
            //         frameborder = "0" 
            //         allow = "accelerometer; 
            //         autoplay; 
            //         clipboard-write; 
            //         encrypted-media; 
            //         gyroscope; 
            //         picture-in-picture" 
            //         allowfullscreen>
            //     </iframe>`
            // }}
            scalesPageToFit={true}
            style={{ 
                flex: 1 
            }}
            startInLoadingState={true}
            renderLoading={_renderLoadingScreen}
            injectedJavaScript={INJECTED_JAVASCRIPT}
        />
    );
}

export default YoutubePlayer;

