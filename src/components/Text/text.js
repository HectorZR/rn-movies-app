import React from 'react';
import {StyleSheet, Text} from 'react-native';

function TextCustom({children, customStyle = {}}) {
  return <Text style={{...styles.text, ...customStyle}}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
    paddingRight: 5,
  },
});

export default TextCustom;
