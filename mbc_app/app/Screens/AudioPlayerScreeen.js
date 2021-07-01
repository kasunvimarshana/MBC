import React, { Component } from 'react';
import { 
    StyleSheet, 
    View, 
    Image, 
    SafeAreaView, 
    TouchableOpacity 
} from "react-native";
import { 
    Colors
} from 'react-native-paper';
import { FontAwesome, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { Audio } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import LoadingComponent from '../Components/LoadingComponent';

const logoImage = require('../Assets/logo-removebg.png');

class AudioPlayerScreeen extends Component {
    state = {};
    _isMounted = false;

    constructor( props ) {
        super( props );
        this.state = {
            isPortrait: true,
            sound: null,
            playbackStatus: {}
        };

        this.audioPlayerRef = React.createRef();
    }

    _handleAudioPlayerRef = (component) => {
        this.audioPlayerRef = component;
    }

    getSelectedAudio = () => {
        const { audio } = this.props.route.params;
        audio.uri = {uri: audio.audio_uri};
        return audio;
    }

    errorCallbackHandler = ( error ) => {
        //console.error('Error: ', error.message, error.type, error.obj);
        console.error('errorCallbackHandler', error);
    }

    UNSAFE_componentWillMount() {}

    componentDidMount() {
        this._isMounted = true;
        this._activate();
        this._initPlayer();
    }

    componentWillUnmount() {
        this._unloadSoundObject();
        this._deactivate();
    }

    _activate = () => {
        activateKeepAwake(); 
    };

    _deactivate = () => {
        deactivateKeepAwake(); 
    };

    _initPlayer = async () => {
        try {
            const audio = this.getSelectedAudio();
            //console.log('audio', audio);
            await this._createSoundObject(audio);
        } catch (error) {
            console.log("error", error);
        }
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

    _createSoundObject = async ( audio ) => {
        let result = null;
        try{
            const { sound: soundObject, status } = result = await Audio.Sound.createAsync(
                { uri: audio.audio_uri }, 
                { 
                    shouldPlay: false,
                    isLooping: false 
                }
            );
            soundObject.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
            this.setState({sound: soundObject});
        }catch(error){
            console.log("error", error);
        }
        //console.log("_createSoundObject", result);
        return result;
    }

    _loadSoundObject = async ( audio ) => {
        let result = null;
        try{
            const { sound: soundObject } = this.state;
            if( soundObject !== null ){
                result = await soundObject.loadAsync(
                    { uri: audio.audio_uri }, 
                    { 
                        shouldPlay: false,
                        isLooping: false 
                    }
                );
                this.setState({sound: soundObject});
            }else{
                let tempSoundObject = new Audio.Sound();
                tempSoundObject.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
                result = await tempSoundObject.loadAsync(
                    { uri: audio.audio_uri }, 
                    { 
                        shouldPlay: false,
                        isLooping: false 
                    }
                );
                this.setState({sound: tempSoundObject});
            }
        }catch(error){
            console.log("error", error);
        }
        //console.log("_loadSoundObject", result);
        return result;
    }

    _unloadSoundObject = async () => {
        let result = null;
        try{
            const { sound: soundObject } = this.state;
            if( soundObject !== null ){
                result = await soundObject.unloadAsync();
                // this.setState((prevState) => {
                //     return {
                //         ...prevState,
                //         sound: null
                //     }
                // });
            }
        }catch(error){
            console.log("error", error);
        }
        //console.log("_unloadSoundObject", result);
        return result;
    }

    _playSoundObject = async () => {
        let result = null;
        try{
            const { sound: soundObject } = this.state;
            if( soundObject !== null ){
                result = await soundObject.playAsync();
                // this.setState({sound: soundObject});
            }
        }catch(error){
            console.log("error", error);
        }
        //console.log("_playSoundObject", result);
        return result;
    }

    _replaySoundObject = async () => {
        let result = null;
        try{
            const { sound: soundObject } = this.state;
            if( soundObject !== null ){
                result = await soundObject.replayAsync();
                // this.setState({sound: soundObject});
            }
        }catch(error){
            console.log("error", error);
        }
        //console.log("_replaySoundObject", result);
        return result;
    }

    _pauseSoundObject = async () => {
        let result = null;
        try{
            const { sound: soundObject } = this.state;
            if( soundObject !== null ){
                result = await soundObject.pauseAsync();
                // this.setState({sound: soundObject});
            }
        }catch(error){
            console.log("error", error);
        }
        //console.log("_pauseSoundObject", result);
        return result;
    }

    _stopSoundObject = async () => {
        let result = null;
        try{
            const { sound: soundObject } = this.state;
            if( soundObject !== null ){
                result = await soundObject.stopAsync();
                // this.setState({sound: soundObject});
            }
        }catch(error){
            console.log("error", error);
        }
        //console.log("_stopSoundObject", result);
        return result;
    }

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
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.contentContainer}>
                    {
                        ( this.state.playbackStatus.isLoaded !== true ) && this._renderLoadingScreen( !this.state.playbackStatus.isLoaded )
                    }

                    {
                        ( this.state.playbackStatus.isLoaded === true ) && (
                            <React.Fragment>
                                <View style={{ alignItems: "center" }}>
                                    <View style={styles.coverContainer}>
                                        <Image source={logoImage} style={styles.cover}></Image>
                                    </View>
                                </View>

                                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 16 }}>
                                    <TouchableOpacity 
                                        disabled={!this.state.playbackStatus.isPlaying} 
                                        onPress={this._pauseSoundObject}
                                    >
                                        <FontAwesome5 name="pause" size={32} color="#93A8B3"></FontAwesome5>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        disabled={this.state.playbackStatus.isPlaying} 
                                        onPress={this._playSoundObject} 
                                        style={[styles.playButtonContainer, {
                                            borderColor: ( this.state.playbackStatus.isPlaying === true ) ? colors.green300 : colors.red300
                                        }]}
                                    >
                                        <FontAwesome5
                                            name="play"
                                            size={32}
                                            color="#3D425C"
                                            style={[styles.playButton, { marginLeft: 8 }]}
                                        ></FontAwesome5>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        disabled={!this.state.playbackStatus.isPlaying} 
                                        onPress={this._stopSoundObject}
                                    >
                                        <FontAwesome5 name="stop" size={32} color="#93A8B3"></FontAwesome5>
                                    </TouchableOpacity>
                                </View>
                            </React.Fragment>
                        )
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
        flexDirection: "column",
        //justifyContent: 'center',
    },
    textLight: {
        color: "#B6B7BF"
    },
    text: {
        color: "#8E97A6"
    },
    textDark: {
        color: "#3D425C"
    },
    coverContainer: {
        marginTop: 32,
        width: 250,
        height: 250,
        shadowColor: "#5D3F6A",
        shadowOffset: { height: 15 },
        shadowRadius: 8,
        shadowOpacity: 0.3
    },
    cover: {
        width: 250,
        height: 250,
        borderRadius: 125,
        resizeMode: 'stretch'
    },
    track: {
        height: 2,
        borderRadius: 1,
        backgroundColor: "#FFF"
    },
    thumb: {
        width: 8,
        height: 8,
        backgroundColor: "#3D425C"
    },
    timeStamp: {
        fontSize: 11,
        fontWeight: "500"
    },
    playButtonContainer: {
        backgroundColor: "#FFF",
        borderColor: "rgba(93, 63, 106, 0.2)",
        borderWidth: 16,
        width: 128,
        height: 128,
        borderRadius: 64,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 32,
        shadowColor: "#5D3F6A",
        shadowRadius: 30,
        shadowOpacity: 0.5
    }
});

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AudioPlayerScreeen);