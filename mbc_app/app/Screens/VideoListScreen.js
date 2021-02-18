import React, { Component } from 'react';
import { 
    StyleSheet,
    View,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    RefreshControl,
    Dimensions,
    StatusBar 
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

import { getAllVideos } from '../Store/Actions/VideoAction';
import VideoCardItem from '../Components/VideoCardItem';
import ListItemSeparator from '../Components/ListItemSeparator';
const logoImage = require('../Assets/logo-removebg.png');

class VideoListScreen extends Component {

    state = {};

    constructor( props ) {
        super( props );
        this.state = {
            videoList: [],
            isFlatListRefreshing: false
        };
    }

    fetchVideoData = async () => {
        //return this.props.ui_GetAllVideos();
        this.setState({isFlatListRefreshing: true})
        this.props.ui_GetAllVideos().then((videoList) => {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    videoList: videoList,
                    isFlatListRefreshing: false
                }
            });
        });
    };

    componentDidMount() {
        this.fetchVideoData();
    }

    componentDidUpdate( prevProps ){ }

    flatListRefreshHandler = () => {
        this.fetchVideoData();
    }

    listItemClickHandler = (item) => {
        this.props.navigation.navigate('PlayerScreen', {video: item});
    }

    render() {
        return(
            <SafeAreaView style={styles.container}>
                <View style={styles.contentContainer}>
                    <FlatList
                        data={this.state.videoList}
                        extraData={this.state.videoList}
                        ItemSeparatorComponent={ListItemSeparator}
                        renderItem={ ({item}) => (<VideoCardItem item={item} onPressHandler={() => {this.listItemClickHandler(item)}}/>) }
                        keyExtractor={(item, index) => index.toString()}
                        refreshControl={
                            <RefreshControl refreshing={this.state.isFlatListRefreshing} onRefresh={this.flatListRefreshHandler} />
                        }
                    />
                </View>
            </SafeAreaView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight || 0,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: Colors.teal400
    },
    contentContainer: {
        flex: 1,
        flexDirection: "column",
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