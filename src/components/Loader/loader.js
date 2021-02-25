import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import styles from './styles';

function Loader({fullscreen}) {
  return (
    <View style={[styles.loader, fullscreen ? styles.fullscreen : null]}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}

export default Loader;
