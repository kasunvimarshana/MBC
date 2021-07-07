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
import * as ScreenOrientation from 'expo-screen-orientation';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import YoutubePlayer from '../Components/YoutubePlayer';
import VideoPlayerComponent from '../Components/VideoPlayerComponent';

class VideoPlayerScreen extends Component {

    state = {};
    _isMounted = false;

    constructor( props ) {
        super( props );
        this.state = {
            isPortrait: true
        };
    }

    getSelectedVideo = () => {
        const { video } = this.props.route.params;
        video.uri = {uri: video.video_uri};
        return video;
    }

    UNSAFE_componentWillMount() {}

    componentDidMount() {
        this._isMounted = true;
        this._activate();
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.backOnPressHandler);
    }

    componentWillUnmount() {
        // Clean up listener
        this._isMounted = false;
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state, callback) => {
            return;
        };
        this._deactivate();
        if( this.backHandler !== null ){
            //BackHandler.removeEventListener('hardwareBackPress', this.backOnPressHandler);
            this.backHandler.remove();
        }
    }

    _renderVideoPlayer = ( video ) => {
        return (
            <VideoPlayerComponent
                playerProps={{
                    source: video.uri,
                }}
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

    backOnPressHandler = () => {
        //this.goBack();
        // return true;
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

const colors = Colors;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#EAEAEC'
    },

    contentContainer: {
        flex: 1,
        // paddingTop: StatusBar.currentHeight || 0,
        // paddingTop: Constants.statusBarHeight || StatusBar.currentHeight || 0,
        // flexDirection: 'column',
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