import {getYoutubeMeta} from 'react-native-youtube-iframe';
import axios from 'axios';
import {API_KEY, PLAYLIST_ID} from '../common/Constant';

export const getThumbnailUrl = async videoId => {
  var meta = await getYoutubeMeta(videoId);
  return meta.thumbnail_url;
};
export const getVideoIdsInPlaylist = async () => {
  console.log('getVideoIdsInPlaylist: ');
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${PLAYLIST_ID}&key=${API_KEY}`,
    );
    //Danh sách video
    let videos = response.data.items;
    console.log('videos: ', videos);
    //Danh sách id video trong play list
    // let videoIds = videos.map(video =>
    //   getThumbnailUrl(video.snippet.resourceId.videoId),
    // );

    return videos;
  } catch (error) {
    console.log('error: ', error);
  }
};
