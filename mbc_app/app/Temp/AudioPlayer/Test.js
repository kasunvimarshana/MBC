import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';

export default function App() {
    const [sound, setSound] = React.useState();

    async function playSound() {
        console.log('Loading Sound');
        // const playbackObject = new Audio.Sound();
        // const { sound } = await Audio.Sound.createAsync(
        //     require('./assets/Hello.mp3')
        // );
        const { sound } = await Audio.Sound.createAsync(
            { uri: 'http://154.66.125.13:86/broadwavehigh.mp3?src=1' }
        );
        setSound(sound);
        console.log('Playing Sound');
        await sound.playAsync(); 
    }

    React.useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync(); 
            }
            : undefined;
    }, [sound]);

    return (
        <View style={styles.container}>
            <Button title="Play Sound" onPress={playSound} />
        </View>
    );
}

const styles = StyleSheet.create({}); 
