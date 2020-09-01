import React, { Component } from 'react';
import {  StyleSheet, Text,Image, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';

class Videos extends Component {
  videoPlayer;
  constructor(props) {
    super(props);
    this.state = {
      playerState: PLAYER_STATES.PLAYING,
      screenType: 'content',
      currentTime: 0,
      duration: 0,
      isFullScreen: false,
      isLoading: true,
      paused: false,
      videos: '',

      List: [{   
        title:'Cartoon Video',
        source:'../assets/videos/SampleVideo1.mp4'
      },
      { title:'Natural Video',
        source:'../assets/videos/SampleVideo2.mp4'
      },
      { title:'Forest Video',
        source:'../assets/videos/SampleVideo3.mp4' 
      },
      { title:'Horrer Video',
        source:'../assets/videos/SampleVideo4.mp4'
      },
      { title:'Commedy Video', 
        source:'../assets/videos/SampleVideo2.mp4' 
      }
      ]
    };
  }

  Videos(list) {
    this.setState({ videos: list }); 
  }

  ListViewItemSeparator = () => {  
    return (  
        <View  
            style={styles.itemSeparator} />  
    );  
  }

  onSeek = seek => {
    this.videoPlayer.seek(seek);
  };

  onPaused = playerState => {
    this.setState({
      paused: !this.state.paused,
      playerState,
    });
  };

  onReplay = () => {
    this.setState({ playerState: PLAYER_STATES.PLAYING });
    this.videoPlayer.seek(0);
  };
  onLoad = data => this.setState({ duration: data.duration, isLoading: false });
  
  onLoadStart = data => this.setState({ isLoading: true });
  
  onEnd = () => this.setState({ playerState: PLAYER_STATES.ENDED });

  onProgress = data => {
    const { isLoading, playerState } = this.state;
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      this.setState({ currentTime: data.currentTime });
    }
  };
  
  onError = () => alert('Oh! ', error);
  
  exitFullScreen = () => {
    alert('Exit full screen');
  };
  
  enterFullScreen = () => {};
  
  onFullScreen = () => {
    if (this.state.screenType == 'content')
      this.setState({ screenType: 'cover' });
    else this.setState({ screenType: 'content' });
  };

  onSeeking = currentTime => this.setState({ currentTime });

  get switchVideos() {
    switch (this.state.videos) {
      case '../assets/videos/SampleVideo1.mp4':return require('../assets/videos/SampleVideo1.mp4')
      case '../assets/videos/SampleVideo2.mp4':return require('../assets/videos/SampleVideo2.mp4')
      case '../assets/videos/SampleVideo3.mp4':return require('../assets/videos/SampleVideo3.mp4')
      case '../assets/videos/SampleVideo4.mp4':return require('../assets/videos/SampleVideo4.mp4')
      case '../assets/videos/SampleVideo2.mp4':return require('../assets/videos/SampleVideo2.mp4')
      default:return require('../assets/videos/SampleVideo1.mp4')
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex:1}}>
        <Video
          source={this.switchVideos} 
          ref={videoPlayer => (this.videoPlayer = videoPlayer)}
          resizeMode={this.state.screenType}
          onFullScreen={this.state.isFullScreen}
          style={styles.player}
          volume={10}
          onEnd={this.onEnd}
          onLoad={this.onLoad}
          onBuffer={this.onBuffer}                
          onError={this.videoError}
          onLoadStart={this.onLoadStart}
          onProgress={this.onProgress}
          paused={this.state.paused}
        />
        <MediaControls
          onSeek={this.onSeek}
          onSeeking={this.onSeeking}
          playerState={this.state.playerState}
          progress={this.state.currentTime}
          duration={this.state.duration}
          isLoading={this.state.isLoading}
          mainColor="#f05555"
          onFullScreen={this.onFullScreen}
          onPaused={this.onPaused}
          onReplay={this.onReplay}
        />
        </View>
        <View style={{flex:2}}>
        <FlatList
          data={this.state.List}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) =>
          <ScrollView>
          <TouchableOpacity
          onPress={() => this.Videos(item.source)}
          style={styles.buttons}>
          <Text>Title: {item.title}</Text>
          </TouchableOpacity>
          </ScrollView>
          }
        />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  player: {
    position: 'absolute',
    top: 2,
    left: 2,
    bottom: 2,
    right: 2,
    backgroundColor: 'white',
  },
  toolbar: {
    marginTop: 40,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  buttons:{
    flex:1,
    height:80,
    backgroundColor:'#f05555',
    alignItems:'center',
    justifyContent:'center',
  },
  img:{
    height:10,
    width:10
  },
  itemSeparator:{  
    height: 5,  
    width: "100%",  
    backgroundColor: "#000",  
  },
});
export default Videos;