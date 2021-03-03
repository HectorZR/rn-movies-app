import {useEffect, useState} from 'react';
import {apiEndpoints} from '../../routes';
import {trans} from '../../trans/trans';
import useXhr from '../../utils/useXhr';

export default function useFetchMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const [send] = useXhr({
    url: apiEndpoints.listMovies,
    queryParams: {
      page,
      limit: 10,
    },
  });

  const fetchMovies = () => {
    send()
      .then(({data}) => {
        setPage((oldPage) => oldPage + 1);
        setMovies((oldMovies) => [...oldMovies, ...data?.movies]);
      })
      .catch((err) => {
        console.error(err);
        throw new Error(trans('exceptions.requestError'));
      })
      .finally(() => setLoading(false));
  };

  const nextPage = () => setPage((oldPage) => oldPage + 1);

  const restartPage = () => {
    setPage(1);
    setMovies([]);
  };

  useEffect(fetchMovies, [page]);

  return [movies, loading, restartPage, nextPage, page];
}
