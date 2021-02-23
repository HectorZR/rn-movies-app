import {lazy} from 'react';

const HomeScreen = lazy(() => import('../screens/Home'));

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
];
