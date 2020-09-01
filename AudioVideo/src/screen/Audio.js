import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, FlatList, View, Image } from 'react-native';
import Sound from 'react-native-sound';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

var sound;
function stopSound(item) {
  if (sound) {
    sound.stop(() => {
      console.log('Stop');
    });
  }
}

function componentWillUnmount() {
  sound.release();
}

function playSound(item) {
  sound = new Sound(item.songUri, (error) => {
    if (error) {
      alert('error' + error.message);
      return;
    }
    sound.play(() => {
      sound.release();
    });
  })
}

class Audio extends Component {
  constructor(props) {
    super(props);
    Sound.setCategory('Playback', true);
    this.state = {
      images: '',
      audioList: [
        {
          title: 'Akhiyan-Sidhu-Moose-Wala',
          songUri: require('../assets/audios/Song1.mp3'),
          imageUri: require('../assets/audios/img1.jpg'),
        },
        {
          title: 'Pagg-Da-Brand-Ranjit-Bawa',
          songUri: require('../assets/audios/Song2.mp3'),
          imageUri: require('../assets/audios/img5.jpg'),
        },
        {
          title: 'Paapi-Rangrez-Sidhu,Sidhu-Moose-Wala',
          songUri: require('../assets/audios/Song3.mp3'),
          imageUri: require('../assets/audios/img1.jpg'),
        },
        {
          title: 'Muchh-Veer-Sandhu,Sidhu-Moose-Wala',
          songUri: require('../assets/audios/Song4.mp3'),
          imageUri: require('../assets/audios/img6.jpg'),
        },
        {
          title: 'Mera-Ki-Mareya-Diljit-Dosanjh',
          songUri: require('../assets/audios/Song5.mp3'),
          imageUri: require('../assets/audios/img1.jpg'),
        },
        {
          title: 'Bachpan-Ranjit-Bawa',
          songUri: require('../assets/audios/Song6.mp3'),
          imageUri: require('../assets/audios/img5.jpg'),
        },
      ]
    };
  }

  get imageChange() {
    let index = 0;
    if (this.state.images == '')
      return require('../assets/audios/img1.jpg');
    else
      while (index < this.state.audioList.length) {
        if (this.state.images == this.state.audioList[index].title)
          return this.state.audioList[index].imageUri;
        index++;
      }
  }

  image(name) {
    this.setState({ images: name })
    console.log(name);
  }

  ListViewItemSeparator = () => {
    return (
      <View
        style={styles.itemSeparator}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.detail}>
          <Image source={this.imageChange}
            style={styles.imagepic} />
        </View>
        <View style={styles.list}>
          <FlatList
            data={this.state.audioList}
            ItemSeparatorComponent={this.ListViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.renderItem}>
                <View style={{ flex: 2 }}>
                  <TouchableOpacity
                    onPress={() => {
                      return playSound(item)
                        ||
                      this.image(item.title)
                    }}>
                    <View style={styles.btnContainer}>
                      <Image source={item.imageUri}
                        style={styles.image} />
                      <Text style={styles.text}>{'  ' + item.title}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.stopbtn}>
                  <TouchableOpacity
                    onPress={() => { return stopSound(item) }}>
                    <FontAwesome name="pause" color="red" size={20} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  detail: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  list: {
    flex: 2
  },
  itemSeparator: {
    height: 5,
    width: "100%",
    backgroundColor: "#000",
  },
  renderItem: {
    margin: 10,
    flexDirection: 'row'
  },
  btnContainer: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 20,
  },
  btnText: {
    fontSize: 20,
  },
  image: {
    width: 50,
    height: 50,
  },
  stopbtn: {
    flex: 1,
    justifyContent: 'center'
  },
imagepic:{
  height: '100%', 
  width: '100%'
}
});

export default Audio;