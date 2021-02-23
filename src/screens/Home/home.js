import React from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';
import Scaffold from '../../components/Scaffold';
import useFetchMovies from './functions';

export default function Home() {
  const [movies] = useFetchMovies();
  return (
    <Scaffold>
      <Text style={styles.text}>Hello World</Text>
      <FlatList
        data={movies}
        renderItem={({item}) => <Text>{item.title}</Text>}
      />
    </Scaffold>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#000',
  },
});
