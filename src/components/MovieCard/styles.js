import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  cardContainer: {
    marginVertical: 2,
    width: '50%',
  },
  contentCard: {
    justifyContent: 'flex-end',
    height: '100%',
  },
  contentCardText: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  backgroundImageContainer: {
    resizeMode: 'cover',
    flex: 1,
    width: '100%',
    height: 500,
  },
  backgroundImage: {},
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
