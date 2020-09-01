import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, FlatList, View, ScrollView, SafeAreaView } from 'react-native';
import Sound from 'react-native-sound';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

var sound;
function playSound(item) {
    sound = new Sound(item.url, (error) => {
      if (error) {
        alert('error' + error.message);
        return;
      }
      sound.play(() => {
        sound.release();
      });
    })
}

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
 

class Audio extends Component {
  constructor(props) {
    super(props);
    Sound.setCategory('Playback', true);
    this.state = {
      tests: {},
      audio : [
        {
        title: 'Akhiyan-Sidhu-Moose-Wala',
        isRequire: true,
        url: require('../assets/audios/Song1.mp3'),
        },
        {
        title: 'Pagg-Da-Brand-Ranjit-Bawa',
        isRequire: true,
        url: require('../assets/audios/Song2.mp3'),
        },
        {
        title: 'Paapi-Rangrez-Sidhu,Sidhu-Moose-Wala',
        isRequire: true,
        url: require('../assets/audios/Song3.mp3'),
        },
        {
        title: 'Muchh-Veer-Sandhu,Sidhu-Moose-Wala',
        isRequire: true,
        url: require('../assets/audios/Song4.mp3'),
        },
        {
        title: 'Mera-Ki-Mareya-Diljit-Dosanjh',
        isRequire: true,
        url: require('../assets/audios/Song5.mp3'),
        },
        {
        title: 'Bachpan-Ranjit-Bawa',
        isRequire: true,
        url: require('../assets/audios/Song6.mp3'),
        },
      ]    
    };
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
      <View>
      <FlatList
        data={this.state.audio}
        ItemSeparatorComponent={this.ListViewItemSeparator}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ backgroundColor: 'skyblue', padding: 20 }}>
            <Text>Title: {item.title}</Text>
            <TouchableOpacity>
              <FontAwesome
            onPress={() =>{ return playSound(item);
            }}
            name="play"
            color="white"
            size={25}
          />
            </TouchableOpacity>
            <TouchableOpacity>
                <FontAwesome
            onPress={() =>{ return stopSound(item);
            }}
            name="pause"
            color="maroon"
            size={25}
          />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
    );
  }
}

const styles = StyleSheet.create({
  itemSeparator:{  
    height: 5,  
    width: "100%",  
    backgroundColor: "#000",  
  },
  Text:{
    fontSize:20,
    color:'black'
  },
  
});

export default Audio;