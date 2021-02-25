import {lazy} from 'react';

const HomeScreen = lazy(() => import('../screens/Home'));
const MovieDetails = lazy(() => import('../screens/MovieDetails'));

export const apiEndpoints = {
  listMovies: '/list_movies.json',
};

export const appRoutes = [
  {
    name: 'home',
    component: HomeScreen,
    options: {
      title: 'Movie App',
    },
  },
  {
    name: 'movieDetails',
    component: MovieDetails,
    options: {
      title: 'Movie Details',
    },
  },
];
