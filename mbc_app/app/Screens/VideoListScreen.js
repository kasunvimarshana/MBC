import React, { Component } from 'react';
import { 
    StyleSheet,
    View,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    RefreshControl,
    Dimensions,
    StatusBar,
    BackHandler 
} from 'react-native';
import { 
    Colors,
    Text,
    Avatar, 
    Button, 
    Card, 
    Title, 
    Paragraph,
    Headline,
    ActivityIndicator 
} from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';
import * as ScreenOrientation from 'expo-screen-orientation';

import { getAllVideos } from '../Store/Actions/VideoAction';
import VideoCardItem from '../Components/VideoCardItem';
import ListItemSeparator from '../Components/ListItemSeparator';
import LoadingComponent from '../Components/LoadingComponent';
const logoImage = require('../Assets/logo-removebg.png');

class VideoListScreen extends Component {

    state = {};

    constructor( props ) {
        super( props );
        this.state = {
            videoList: [],
            isFlatListRefreshing: false,
            isOnReady: false
        };
    }

    fetchVideoData = async () => {
        //return this.props.ui_GetAllVideos();
        this.setState({isFlatListRefreshing: true})
        this.props.ui_GetAllVideos()
        .then(( videoList ) => {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    videoList: videoList,
                    isFlatListRefreshing: false
                }
            });
        }, (error) => {
            //console.log('error', error);
            throw new Error( error );
        })
        .catch((error) => {
            console.log("error", error);
        })
        .finally(() => {
            this.setState({ isFlatListRefreshing: false });
        });
    };

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.backOnPressHandler);
        this.fetchVideoData()
        .finally(() => {
            this.setState({ isOnReady: true });
        });
    }

    componentWillUnmount() {
        // Clean up listener
        this._isMounted = false;
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state, callback) => {
            return;
        };
        //BackHandler.removeEventListener('hardwareBackPress', this.backOnPressHandler);
        this.backHandler.remove();
    }

    backOnPressHandler = () => {
        //this.goBack();
        return true;
    }

    componentDidUpdate( prevProps ){ }

    flatListRefreshHandler = () => {
        this.fetchVideoData();
    }

    listItemClickHandler = (item) => {
        this.props.navigation.navigate('DrawerNavigatorRoutes', {
            screen: 'PlayerRoutes',
            // initial: true,
            params: {
                screen: 'VideoPlayerScreen',
                // initial: true,
                params: {
                    video: item
                }
            }
        });
    }

    switchToLandscape = async () => {
        console.log('switchToLandscape');
        //ScreenOrientation.allow(ScreenOrientation.Orientation.LANDSCAPE);
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }

    switchToPortrait = async () => {
        console.log('switchToPortrait');
        //ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }

    switchToDefaultOrientation = async () => {
        console.log('switchToDefaultOrientation');
        ScreenOrientation.unlockAsync();
    }

    getViewContent = () => {
        var content = null;

        // if( this.state.videoList && this.state.videoList.length > 0 ){
        //     content = (
        //         <FlatList
        //             data={this.state.videoList}
        //             extraData={this.state.videoList}
        //             ItemSeparatorComponent={ListItemSeparator}
        //             renderItem={ ({item}) => (<VideoCardItem item={item} onPressHandler={() => {this.listItemClickHandler(item)}}/>) }
        //             keyExtractor={(item, index) => index.toString()}
        //             refreshControl={
        //                 <RefreshControl refreshing={this.state.isFlatListRefreshing} onRefresh={this.flatListRefreshHandler} />
        //             }
        //         />
        //     );
        // }else{
        //     content = (
        //         <Card>
        //             <Card.Content>
        //                 <Title>There is no Videos at This Moment</Title>
        //             </Card.Content>
        //         </Card>
        //     );
        // }

        content = (
            <FlatList
                data={this.state.videoList}
                extraData={this.state.videoList}
                ItemSeparatorComponent={ListItemSeparator}
                renderItem={ ({item}) => (<VideoCardItem item={item} onPressHandler={() => {this.listItemClickHandler(item)}}/>) }
                keyExtractor={(item, index) => index.toString()}
                refreshControl={
                    <RefreshControl 
                        refreshing={this.state.isFlatListRefreshing} 
                        onRefresh={this.flatListRefreshHandler} 
                        // enabled={this.state.isOnReady}
                    />
                }
            />
        );

        return content;
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

        const content = this.getViewContent();

        return(
            <SafeAreaView style={styles.container}>
                <View style={styles.contentContainer}>

                    {
                        ( this.state.isOnReady !== true ) && this._renderLoadingScreen( !this.state.isOnReady )
                    }

                    {
                        ( this.state.isOnReady === true ) && (
                            content
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
        justifyContent: 'center',
    }
});

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        ui_GetAllVideos: () => dispatch(getAllVideos())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoListScreen);