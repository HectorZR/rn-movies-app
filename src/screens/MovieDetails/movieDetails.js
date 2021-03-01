import React from 'react';
import {Image, ImageBackground, ScrollView, View} from 'react-native';
import Text from '../../components/Text';
import {trans} from '../../trans/trans';
import fetchMovieDetails from './functions';
import styles from './styles';

function MovieDetails({route}) {
  const {itemId = 0} = route.params;
  const [movieData] = fetchMovieDetails(itemId);

  return (
    <ScrollView>
      <ImageBackground
        source={{uri: movieData?.background_image}}
        style={styles.imageBackground}>
        <View style={styles.movieInfo}>
          <View>
            <Image
              source={{uri: movieData?.medium_cover_image}}
              style={styles.movieImage}
            />
          </View>
          <View style={styles.movieText}>
            <Text customStyle={styles.movieTitle}>{movieData?.title_long}</Text>
            <Text customStyle={styles.movieRating}>{`${trans(
              'words.rating',
            )}: ${movieData?.rating}`}</Text>
            <Text customStyle={styles.movieRating}>{`${trans(
              'words.language',
            )}: ${movieData?.language}`}</Text>
            <Text customStyle={styles.movieDescription}>
              {movieData?.description_full}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

export default MovieDetails;
