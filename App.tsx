/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {useState, useCallback, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Alert,
  Button,
  Image,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import {getThumbnailUrl, getVideoIdsInPlaylist} from './src/api/GetApi';

function App(): React.JSX.Element {
  const [playing, setPlaying] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [videoIds, setVideoIds] = useState([]);
  useEffect(() => {
    async function fetchThumbnailUrl() {
      try {
        const videoIdsList = await getVideoIdsInPlaylist();
        console.log('videoIdsList: ', videoIdsList);
        setVideoIds(videoIdsList);
      } catch (error) {
        console.error('Error fetching thumbnail URL:', error);
        // Xử lý lỗi nếu cần
      }
    }
    fetchThumbnailUrl();
  }, []);
  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);
  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text>Trình phát video</Text>
          <YoutubePlayer
            height={300}
            play={true}
            // videoId={'iee2TATGMyI'}
            playList={'PLbpi6ZahtOH6Blw3RGYpWkSByi_T7Rygb'}
            onChangeState={onStateChange}
          />
        </View>
        <Button title="check" onPress={getVideoIdsInPlaylist} />
        <View>
          <Image
            source={{uri: thumbnailUrl}}
            style={{width: 200, height: 200}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
