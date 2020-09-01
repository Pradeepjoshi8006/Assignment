import React from 'react';
import { View, StyleSheet, } from 'react-native';
import Button from '../components/Button';

export default class Player extends React.Component {
  render() {
    return (
      <View
        style={styles.container}>
        <Button
          title="Play Videos"
          customClick={() => this.props.navigation.navigate('Videos')}
        />
        <Button
          title="Play Audios"
          customClick={() => this.props.navigation.navigate('Audio')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  text: {
    color: '#111825',
    fontSize: 18,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
  },
});