import React from 'react';
import {FlatList, View} from 'react-native';
import Loader from '../../components/Loader';
import Scaffold from '../../components/Scaffold';
import MovieCard from '../../components/MovieCard';
import useFetchMovies from './functions';

export default function Home({navigation}) {
  const [movies, loading] = useFetchMovies();

  const renderItem = ({item}) => (
    <MovieCard item={item} navigation={navigation} />
  );

  return (
    <Scaffold>
      <View>
        {loading ? (
          <Loader fullscreen />
        ) : (
          <FlatList
            data={movies}
            numColumns={2}
            renderItem={renderItem}
            keyExtractor={(item) => item?.id?.toString()}
          />
        )}
      </View>
    </Scaffold>
  );
}
