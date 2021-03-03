import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, View} from 'react-native';
import Loader from '../../components/Loader';
import Scaffold from '../../components/Scaffold';
import MovieCard from '../../components/MovieCard';
import useFetchMovies from './functions';

export default function Home({navigation}) {
  const [movies, loading, restartPage, nextPage] = useFetchMovies();
  const width = Math.round(Dimensions.get('window').width);
  const isFullWidth = width >= 400;
  const [numColumns, setNumColumns] = useState(isFullWidth ? 2 : 1);

  const renderItem = ({item}) => (
    <MovieCard item={item} navigation={navigation} fullWidth={isFullWidth} />
  );

  useEffect(() => {
    if (isFullWidth) setNumColumns(2);
    else setNumColumns(1);
  }, [width]);

  return (
    <Scaffold>
      <View>
        {loading ? (
          <Loader fullscreen />
        ) : (
          <FlatList
            data={movies}
            numColumns={numColumns}
            onRefresh={restartPage}
            refreshing={loading}
            renderItem={renderItem}
            keyExtractor={(item) => item?.id?.toString()}
            onEndReached={nextPage}
          />
        )}
      </View>
    </Scaffold>
  );
}
