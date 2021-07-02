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
    BackHandler ,
    Platform
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

import { getVideos } from '../Store/Actions/VideoAction';
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
            isOnReady: false,
            page: 1
        };
    }

    _fetchData = async () => {
        let videoList = new Array();
        try{
            videoList = await this.props.ui_getVideos(true, this.state.page);
        }catch( error ){
            console.log("error", error);
        }
        return videoList;
    }

    loadData = async () => {
        let page = 1;
        let _data = new Array();
        this.setState({ page: page }, console.log('page', page));
        _data = await this._fetchData(true, this.state.page);
        this.setState({ videoList: _data });
    }

    loadMoreData = async () => {
        let page = (this.state.page + 1);
        let _data = new Array();
        this.setState({ page: page }, console.log('page', page));
        _data = await this._fetchData(true, this.state.page);
        this.setState((prevState) => {
            return {
                ...prevState,
                // videoList: [..._data, ...prevState.videoList],
                videoList: [].concat(_data, prevState.videoList)
            }
        });
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.backOnPressHandler);
        this.loadData()
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
        this.setState({isFlatListRefreshing: true});
        this.loadData()
            .finally(() => {
                this.setState({isFlatListRefreshing: false});
            });
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

    getViewContent = () => {
        var content = null;
        content = (
            <FlatList
                data={this.state.videoList}
                extraData={this.state.videoList}
                // ItemSeparatorComponent={ListItemSeparator}
                numColumns={numColumns}
                renderItem={ ({item}) => (
                    <VideoCardItem 
                        item={item} 
                        onPressHandler={() => {this.listItemClickHandler(item)}}
                        viewStyle={styles.listItemView}
                        contentStyle={styles.listItemContent}
                    />
                ) }
                keyExtractor={(item, index) => index.toString()}
                refreshControl={
                    <RefreshControl 
                        refreshing={this.state.isFlatListRefreshing} 
                        onRefresh={this.flatListRefreshHandler} 
                        // enabled={this.state.isOnReady}
                    />
                }
                columnWrapperStyle={styles.flatListColumnWrapperStyle}
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
                            <View>
                                <TouchableOpacity onPress={() => console.log("onPress")}>
                                    <Card>
                                        <Card.Content>
                                            <Title>MBC LIVE STREAMING</Title>
                                            </Card.Content>
                                                <Card.Cover source={logoImage} />
                                            <Card.Content>
                                            <Paragraph>Malawi Broadcasting Coporation, Watch Live</Paragraph>
                                        </Card.Content>
                                    </Card>
                                </TouchableOpacity>
                            </View>
                        )
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

const { width, height } = Dimensions.get('window');
const numColumns = 3;
const itemSize = width / numColumns;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: "#EAEAEC"
    },

    contentContainer: {
        flex: 1,
        // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        // paddingTop: Constants.statusBarHeight || StatusBar.currentHeight || 0,
        flexDirection: "column",
        justifyContent: 'center'
    },

    listItemContent: {
        height: itemSize,
        backgroundColor: colors.BabyPowder
    },

    listItemView: {
        flex: (1 / numColumns), 
        flexDirection: 'column', 
        margin: 1
    },

    flatListColumnWrapperStyle: {}
});

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        ui_getVideos: ( is_paginate = true, page = 1, limit = 10 ) => dispatch(getVideos( is_paginate, page, limit ))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoListScreen);