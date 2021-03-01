import {useEffect, useState} from 'react';
import {apiEndpoints} from '../../routes';
import useXhr from '../../utils/useXhr';

function fetchMovieDetails(id) {
  const [movieData, setMovieData] = useState(null);
  const [send] = useXhr({
    url: apiEndpoints.detailMovie,
    queryParams: {
      movie_id: id,
    },
  });

  useEffect(() => {
    send()
      .then((res) => {
        const {movie} = res?.data || {};
        setMovieData(movie);
      })
      .catch(console.error);
  });

  return [movieData];
}

export default fetchMovieDetails;
