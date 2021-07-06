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
import { getLiveStreams } from '../Store/Actions/LiveStreamAction';
import VideoCardItem from '../Components/VideoCardItem';
import ListItemSeparator from '../Components/ListItemSeparator';
import LoadingComponent from '../Components/LoadingComponent';
const logoImage = require('../Assets/logo-removebg.png');

class VideoListScreen extends Component {

    state = {};
    _isMounted = false;

    constructor( props ) {
        super( props );
        this.state = {
            videoList: [],
            isFlatListRefreshing: false,
            isOnReady: false,
            page: 1,
            isLoadMoreData: false
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
        await this.setState({ page: page }, async () => {
            console.log('page', page);
            _data = await this._fetchData();
            this.setState({ videoList: _data });
        });
    }

    loadMoreData = async () => {
        let page = (this.state.page + 1);
        let _data = new Array();
        await this.setState({ page: page, isLoadMoreData: true }, async () => {
            console.log('page', page);
            _data = await this._fetchData();
            this.setState((prevState) => {
                return {
                    ...prevState,
                    // videoList: [...prevState.videoList, ..._data],
                    videoList: [].concat(prevState.videoList, _data),
                    isLoadMoreData: false
                }
            });
        });
    }

    componentDidMount() {
        this._isMounted = true;
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
        if( this.backHandler !== null ){
            this.backHandler.remove();
        }
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

    _listFooterComponent = () => {
        return (
            <View style = { styles.footerStyle }>
                <TouchableOpacity 
                    activeOpacity = { 0.7 } 
                    style = { styles.TouchableOpacity_style }
                    onPress = { this.loadMoreData } 
                >
                    <Text style = { styles.TouchableOpacity_Inside_Text }> Load More </Text>
                    {
                        ( this.state.isLoadMoreData ) ?
                            <ActivityIndicator 
                                animating={true} 
                                color={colors.white} 
                                size='small'
                                style = {{ marginLeft: 6 }}
                            /> : null      
                    }
                </TouchableOpacity> 
            </View>
        )
    }

    _itemSeparatorComponent = () => {
        return (<ListItemSeparator />);
    }

    _renderItem = ( renderItemProps ) => {
        const { item } = renderItemProps;
        return (
            <VideoCardItem 
                item={item} 
                onPressHandler={() => {this.listItemClickHandler(item)}}
                viewStyle={styles.listItemView}
                contentStyle={styles.listItemContent}
            />
        );
    }

    _refreshControl = () => {
        return (
            <RefreshControl 
                refreshing={this.state.isFlatListRefreshing} 
                onRefresh={this.flatListRefreshHandler} 
                // enabled={this.state.isOnReady}
            />
        );
    }

    getViewContent = () => {
        var content = null;
        content = (
            <FlatList
                data={this.state.videoList}
                extraData={this.state.videoList}
                // ItemSeparatorComponent={this._itemSeparatorComponent}
                numColumns={numColumns}
                renderItem={(renderItemProps) => this._renderItem(renderItemProps)}
                keyExtractor={(item, index) => index.toString()}
                refreshControl={this._refreshControl()}
                columnWrapperStyle={styles.flatListColumnWrapperStyle}
                ListFooterComponent={this._listFooterComponent}
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

    backOnPressHandler = () => {
        //this.goBack();
        return true;
    }

    render() {
        const content = this.getViewContent();
        return(
            <SafeAreaView style={styles.container}>
                <View style={styles.contentContainer}>
                    {
                        ( this.state.isOnReady !== true ) && 
                        this._renderLoadingScreen( !this.state.isOnReady )
                    }
                    {
                        ( this.state.isOnReady === true ) && (
                            <View>
                                <TouchableOpacity onPress={() => {
                                    this.props.navigation.navigate('DrawerNavigatorRoutes', {
                                        screen: 'PlayerRoutes',
                                        // initial: true,
                                        params: {
                                            screen: 'LiveStreamVideoPlayerScreen',
                                            // initial: true,
                                            params: {
                                                video: {name: 'MBC_Live_Streaming'}
                                            }
                                        }
                                    });
                                }}>
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

    flatListColumnWrapperStyle: {},

    footerStyle: {
        padding: 7,
        alignItems: 'center',
        justifyContent: 'center'
    },

    TouchableOpacity_style: {
        padding: 7,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.red300,
        borderRadius: 5,
    },

    TouchableOpacity_Inside_Text: {
        textAlign: 'center',
        color: colors.white,
        fontSize: 18
    }
});

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        ui_getVideos: ( is_paginate = true, page = 1, limit = 10 ) => dispatch(getVideos( is_paginate, page, limit )),
        ui_getLiveStreams: ( name = null ) => dispatch(getLiveStreams( name )) 
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoListScreen);