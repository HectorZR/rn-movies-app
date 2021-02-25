import React from 'react';
import {ImageBackground, Pressable, View} from 'react-native';
import Text from '../Text';
import styles from './styles';
import {trans} from '../../trans/trans';

function MovieCard({item, navigation}) {
  function movieDetails() {
    navigation.navigate('movieDetails', {
      itemId: item.id,
    });
  }

  return (
    <View style={styles.cardContainer}>
      <Pressable title="Go to details" onPress={movieDetails}>
        <ImageBackground
          style={styles.backgroundImageContainer}
          imageStyle={styles.backgroundImage}
          source={{uri: item.medium_cover_image}}>
          <View style={styles.contentCard}>
            <View style={styles.contentCardText}>
              <Text customStyle={styles.textTitle}>{item.title}</Text>
              <Text>{item.year}</Text>
              <Text>{`${trans('words.rating')}: ${item.rating}`}</Text>
              <View style={styles.genresContainer}>
                <Text>{`${trans('words.genres')}:`}</Text>
                {item.genres?.map((genre) => (
                  <Text key={genre}>{genre}</Text>
                ))}
              </View>
            </View>
          </View>
        </ImageBackground>
      </Pressable>
    </View>
  );
}

export default MovieCard;
