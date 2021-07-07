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

import { getLiveStreams } from '../Store/Actions/LiveStreamAction';
import LoadingComponent from '../Components/LoadingComponent';
import VideoPlayerComponent from '../Components/VideoPlayerComponent';

class LiveStreamVideoPlayerScreen extends Component {

    state = {};
    _isMounted = false;

    constructor( props ) {
        super( props );
        this.state = {
            isPortrait: true,
            video: null,
            isOnReady: false,
        };
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

    getSelectedVideo = () => {
        const { video } = this.state;
        video.video_uri = video.uri;
        video.uri = {uri: video.uri};
        return video;
    }

    UNSAFE_componentWillMount() {}

    componentDidMount() {
        this._isMounted = true;
        this._activate();
        this.loadData()
        .finally(() => {
            this.setState({ isOnReady: true });
        });
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
                    source: video.uri
                }}
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

    backOnPressHandler = () => {
        //this.goBack();
        // return true;
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