import {useEffect, useState} from 'react';
import {apiEndpoints} from '../../routes';
import {trans} from '../../trans/trans';
import useXhr from '../../utils/useXhr';

export default function useFetchMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);

  const [send] = useXhr({
    url: apiEndpoints.listMovies,
    queryParams: {
      page: currentPage,
    },
  });

  const fetchMovies = () => {
    send()
      .then(({data}) => {
        setMovies(data?.movies);
        setCurrentPage(data?.pageNumber);
        setNextPage(currentPage + 1);
      })
      .catch((err) => {
        console.error(err);
        throw new Error(trans('exceptions.requestError'));
      })
      .finally(() => setLoading(false));
  };

  useEffect(fetchMovies, [movies, currentPage]);

  return [movies, loading, nextPage, currentPage];
}
