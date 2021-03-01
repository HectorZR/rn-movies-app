import {StyleSheet, Dimensions} from 'react-native';

const {height} = Dimensions.get('window');

export default StyleSheet.create({
  movieInfo: {
    alignItems: 'center',
  },
  imageBackground: {
    width: '100%',
    minHeight: height - 56,
  },
  movieImage: {
    height: 250,
    width: 200,
  },
  movieText: {
    paddingLeft: 10,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  movieRating: {
    fontSize: 20,
    textAlign: 'center',
  },
  movieDescription: {
    paddingTop: 20,
    fontSize: 18,
  },
});
