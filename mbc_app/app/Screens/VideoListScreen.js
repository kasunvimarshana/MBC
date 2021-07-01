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
        ui_GetAllVideos: () => dispatch(getAllVideos())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoListScreen);