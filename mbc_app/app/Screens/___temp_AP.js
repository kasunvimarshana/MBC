import React from 'react';
import { Text, FlatList, Image, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Audio } from 'expo-av';
import firebase from 'firebase';
import { FontAwesome } from '@expo/vector-icons';

export default class AudioPlayerScreeen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            allSongs: [],
            currentSongData: {},
            playingStatus: 'nosound',
            paused: false
        };
    }

  componentDidMount() {
    firebase
      .database()
      .ref('trending/')
      .on('value', snapshot => {
        let array = [];

        snapshot.forEach(child => {
          array.push(child.toJSON());
        });
        this.setState({
          allSongs: array
        });
      });
  }

  renderPlayer = () => {
    let song = this.state.currenSongData
    return (
        <View>
            <TouchableOpacity>
            <View>
            <Image
            style={{
            height: 40,
            width: 40,
            borderRadius: 3,
            backgroundColor: 'gray'
            }}
            source={{ uri: song.image }}
            />
            </View>
            {song && (
            <View>
            <View>
            <Text>{`${song.songTitle} · `}</Text>
            <Text>{song.artist}</Text>
            </View>
            <View>
            <FontAwesome
            color={purple}
            name="play"
            size={14}
            />
            <Text style={styles.device}>NOW PLAYING</Text>
            </View>
            </View>
            )}
            <TouchableOpacity
            onPress={() => togglePlay()}
            >
            <FontAwesome color={colors.white} name={iconPlay} size={28} />
            </TouchableOpacity>
            </TouchableOpacity>
        </View>
    );
  }

  ////////////////////////////////////////////////////////////////////////////
  togglePlay = async () => {
    this.setState(prev => ({
      paused: !prev.paused
    }));
    this._playAndPause();
  };

  _playAndPause = () => {
    switch (this.state.playingStatus) {
      case 'nosound':
        this._playRecording();
        break;
      case 'donepause':
      case 'playing':
        this._pauseAndPlayRecording();
        break;
    }
  };

  async _playRecording() {
    // alert('playing it');
    const { sound } = await Audio.Sound.createAsync(
      { uri: this.state.currentSongData.songLink },
      {
        shouldPlay: true,
        isLooping: false
      },
      this._updateScreenForSoundStatus
    );
    this.sound = sound;
    this.setState({
      layingStatus: 'playing'
    });
  }

  async _pauseAndPlayRecording() {
    if (this.sound != null) {
      if (this.state.playingStatus == 'playing') {
        console.log('pausing...');
        await this.sound.pauseAsync();
        console.log('paused!');
        this.setState({
          playingStatus: 'donepause'
        });
      } else {
        console.log('playing...');
        await this.sound.playAsync();
        console.log('playing!');
        this.setState({
          playingStatus: 'playing'
        });
      }
    }
  }

  _updateScreenForSoundStatus = status => {
    if (status.isPlaying && this.state.playingStatus !== 'playing') {
      this.setState({ playingStatus: 'playing' });
    } else if (!status.isPlaying && this.state.playingStatus === 'playing') {
      this.setState({ playingStatus: 'donepause' });
    }
  };

  _syncPauseAndPlayRecording = () => {
    if (this.sound != null) {
      if (this.state.playingStatus == 'playing') {
        this.sound.pauseAsync();
      } else {
        this.sound.playAsync();
      }
    }
  }
  ////////////////////////////////////////////////////////////////////////////

  render() {
    return (
      <React.Fragment>
        {/* THE PLAYLIST */}
        <Text>Playlist</Text>

        {this.state.allSongs && (
          <FlatList
            contentContainerStyle={styles.containerContent}
            data={this.state.allSongs}
            keyExtractor={itemObj => itemObj.id.toString()}
            renderItem={itemObj => {
              const { item } = itemObj;

              return (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      currentSongData: item
                    });
                  }}
                >
                  <Text>{item.songTitle}</Text>
                  <Text>{item.artist}</Text>
                </TouchableOpacity>
              );
            }}
          />

        {/* THE PLAYER - player code goes here */}

        )}
      </React.Fragment>
    );
  }
}