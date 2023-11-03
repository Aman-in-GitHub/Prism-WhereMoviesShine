import { useMedia } from '@/context/WatchContextProvider';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Loader from '@/elements/Loader';
import MovieCard from '@/elements/MovieCard';

import genre from '../../genre';

const SearchMovie = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  const query = params.id;

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMTdkNDIzZjJkNDJlZjNmMGI5ODMxZDRmNWIzZDMyMSIsInN1YiI6IjY1MzQ5MWRmNDJkODM3MDEwYmE4ZGI2MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fswaz7Sz_3uUyquyKbiJNxchI7VRaIlRAbAPQ217mf0'
      }
    };

    async function getResults() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/multi?query=${query}`,
          options
        );
        const data = await res.json();
        setResults(data.results);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    getResults();
  }, [query]);

  function getNamesByIds(ids) {
    return ids?.map((id) => {
      const genreObj = genre.find((item) => item.id === id);
      return genreObj ? genreObj.name : null;
    });
  }

  const searchResultsBefore = results
    ? results?.map((item) => {
        const hasId = item.id ? 1 : 0;

        const genres = getNamesByIds(item?.genre_ids);

        const bgImage = item.backdrop_path ? true : false;

        const hasAnimation = genres?.includes('Animation') ? 1 : 0;

        return hasAnimation === 0 && hasId === 1 && bgImage ? item : null;
      })
    : null;

  const filteredSearchResults = searchResultsBefore
    ? searchResultsBefore?.filter((item) => item !== null)
    : null;

  let searchResults = filteredSearchResults ? filteredSearchResults : null;

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <section className="px-2 md:px-8 lg:px-10 font-primary">
        {searchResults?.length > 0 ? (
          <>
            <div className="mt-[73px] md:mt-[88px]">
              <h1 className="text-xl md:text-3xl mb-2 font-bold capitalize">
                Showing Results for {query}
              </h1>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-5">
              {searchResults?.map((item, i) => {
                return (
                  <MovieCard movie={item} mediaType={item.media_type} key={i} />
                );
              })}
            </div>
          </>
        ) : (
          <div className="h-screen flex justify-center items-center">
            <span className="font-semibold text-3xl md:text-bold md:text-5xl">
              No Results Found :(
            </span>
          </div>
        )}
      </section>
    </>
  );
};

export default SearchMovie;
