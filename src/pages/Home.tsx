import { useEffect, useState } from 'react';

import Glide from '@glidejs/glide';

import genre from '../../genre';

import { CalendarDays, Timer, Star, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MovieCard from '@/elements/MovieCard';

import Loader from '@/elements/Loader';
import { WatchModeToggle } from '@/components/watch-mode-toggle';
import { useMedia } from '@/context/WatchContextProvider';

const Home = () => {
  const { media } = useMedia();

  const controller = new AbortController();

  const [homeResults, setHomeResults] = useState([]);
  const [ratedMovies, setRatedMovies] = useState([]);

  const [loading, setLoading] = useState(true);

  const [mainMovie, setMainMovie] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/trending/${media}/week?without_genres=16&api_key=${API_KEY}`;

    async function getMovies() {
      try {
        const res = await fetch(url, { signal: controller.signal });
        const data = await res.json();
        setHomeResults(data.results);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    getMovies();

    return () => {
      controller.abort();
    };
  }, [media]);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMTdkNDIzZjJkNDJlZjNmMGI5ODMxZDRmNWIzZDMyMSIsInN1YiI6IjY1MzQ5MWRmNDJkODM3MDEwYmE4ZGI2MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fswaz7Sz_3uUyquyKbiJNxchI7VRaIlRAbAPQ217mf0'
      }
    };

    async function getRatedMovies() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/${media}/top_rated?without_genres=16&page=1`,
          options
        );
        const data = await res.json();
        setRatedMovies(data.results);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    getRatedMovies();
  }, [media]);

  function filterMovies(movies) {
    return movies
      ? movies
          .map((item) => {
            const hasId = item.id ? 1 : 0;
            const genres = getNamesByIds(item?.genre_ids);
            const bgImage = item.backdrop_path ? true : false;
            const hasAnimation = genres?.includes('Animation') ? 1 : 0;

            const name =
              media == 'movie' ? item.title : item.name ? true : false;

            return hasAnimation === 0 && hasId === 1 && bgImage && name
              ? item
              : null;
          })
          .filter((item) => item !== null)
      : null;
  }

  const homeResultsAfter = filterMovies(homeResults);
  const ratedResultsAfter = filterMovies(ratedMovies);

  let mainMovieData = homeResultsAfter ? homeResultsAfter[0] : null;

  const trendingNow = homeResultsAfter ? homeResultsAfter.slice(1) : null;

  const ratedResultsFiltered = ratedResultsAfter ? ratedResultsAfter : null;

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/${media}/${mainMovieData?.id}?without_genres=16&api_key=${API_KEY}&append_to_response=images`;

    async function getImages() {
      try {
        const res = await fetch(url, { signal: controller.signal });
        const data = await res.json();

        setMainMovie(data);
      } catch (error) {
        console.log(error);
      }
    }

    getImages();

    return () => {
      controller.abort();
    };
  }, [homeResults]);

  useEffect(() => {
    if (loading) return;

    if (homeResults?.length > 0) {
      const slider = new Glide('.glide-01', {
        type: 'carousel',
        autoplay: 1,
        animationDuration: 4500,
        animationTimingFunc: 'linear',
        perView: 3,
        classes: {
          nav: {
            active: '[&>*]:bg-wuiSlate-700'
          }
        },
        breakpoints: {
          1024: {
            perView: 2
          },
          640: {
            perView: 1,
            gap: 12
          }
        }
      }).mount();

      return () => {
        slider.destroy();
      };
    }
  }, [homeResults]);

  useEffect(() => {
    if (loading) return;
    if (ratedMovies?.length > 0) {
      const slider = new Glide('.glide-02', {
        type: 'carousel',
        autoplay: 1,
        animationDuration: 9000,
        animationTimingFunc: 'linear',
        perView: 3,
        classes: {
          nav: {
            active: '[&>*]:bg-wuiSlate-700'
          }
        },
        breakpoints: {
          1024: {
            perView: 2
          },
          640: {
            perView: 1,
            gap: 12
          }
        }
      }).mount();

      return () => {
        slider.destroy();
      };
    }
  }, [ratedMovies]);

  function getNamesByIds(ids) {
    return ids?.map((id) => {
      const genreObj = genre.find((item) => item.id === id);
      return genreObj ? genreObj.name : null;
    });
  }

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const isLargeScreen = window.innerWidth >= 726;

  const filteredFilePathsLarge = mainMovie.images?.backdrops
    .filter((image) => image.height)
    .map((image) => image.file_path);

  const largeImage = filteredFilePathsLarge ? filteredFilePathsLarge[0] : '';

  const filteredSmallImage = mainMovie.images?.posters
    .filter((image) => image.height)
    .map((image) => image.file_path);

  const smallImage = filteredSmallImage ? filteredSmallImage[0] : '';

  const heroImageLink = isLargeScreen ? largeImage : smallImage;

  const buttons = [];

  if (media == 'tv') {
    for (let i = 1; i <= mainMovie.number_of_seasons; i++) {
      buttons.push(
        <button
          key={i}
          className="font-semibold bg-lighter_purple px-3 rounded-[2px] py-1 text-base md:text-xl text-[#000000] active:scale-95 duration-300 w-32 whitespace-nowrap hover:bg-[#ECCBFF]"
          onClick={() =>
            navigate(`/player/${mainMovie.id}`, {
              state: { season: i }
            })
          }
        >
          Season {i}
        </button>
      );
    }
  }

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <main className="font-primary select-none">
      <section>
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100vh'
          }}
          className="select-none"
        >
          <div
            style={{
              background: 'rgba(0, 0, 0, 0.7)',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            }}
          ></div>
          <div
            className={`flex items-center bg-cover h-full w-full bg-center`}
            style={{
              color: 'white',
              backgroundImage: `url(https://image.tmdb.org/t/p/original${heroImageLink})`
            }}
          >
            <div className="px-2 md:px-8 lg:px-10 z-40 font-black flex flex-col gap-4 md:gap-5">
              <h1 className="text-4xl md:text-6xl lg:text-8xl">
                {mainMovie.title || mainMovie.name
                  ? media == 'movie'
                    ? mainMovie?.title
                    : mainMovie?.name
                  : 'Movie Title'}
              </h1>
              <h3>
                {mainMovie.genres && mainMovie.genres?.length > 0 ? (
                  mainMovie.genres.map((item, i) => (
                    <span
                      key={item.id}
                      className="text-xl font-semibold md:text-2xl"
                    >
                      {i > 0 && <span className="text-dark_purple"> | </span>}
                      {item.name}
                    </span>
                  ))
                ) : (
                  <span className="text-xl font-semibold md:text-2xl">
                    Genre | Genre
                  </span>
                )}
              </h3>
              <div className="flex items-center gap-4 md:text-xl">
                <div className="flex items-center gap-2 font-semibold">
                  <CalendarDays className="text-dark_purple" />
                  <span>
                    {media == 'movie'
                      ? mainMovie.release_date
                      : mainMovie.first_air_date}
                  </span>
                </div>
                <div className="flex items-center gap-2 font-semibold">
                  <Timer className="text-dark_purple" />
                  <span>
                    {media === 'movie'
                      ? mainMovie.runtime + ' min'
                      : mainMovie.number_of_seasons}
                    {media === 'tv'
                      ? mainMovie.number_of_seasons > 1
                        ? ' seasons'
                        : ' season'
                      : null}
                  </span>
                </div>
              </div>
              <div className="md:text-xl flex items-center gap-4">
                <div className="flex items-center gap-2 font-semibold">
                  <Star className="text-dark_purple" />
                  <span>{mainMovie.vote_average?.toFixed(2)}</span>
                </div>
                <div className="font-semibold">
                  <span
                    className="border-2 px-1 py-0.5"
                    style={{
                      borderColor: 'white'
                    }}
                  >
                    {mainMovie.adult ? '18+' : 'PG 13'}
                  </span>
                </div>
              </div>
              <div className="lg:w-[80%]">
                <span className="font-normal md:text-xl text-sm">
                  {mainMovie.overview
                    ?.split('.')
                    ?.filter((_, index) => index < 2)
                    ?.map((sentence) => (sentence ? `${sentence}.` : ''))
                    ?.join(' ')}
                </span>
              </div>
              <div>
                <button
                  className="bg-dark_purple font-bold text-2xl md:text-4xl md:px-7 md:py-4 px-5 py-3 rounded-[2px] hover:bg-light_purple duration-500 active:scale-95 flex items-center gap-2 md:gap-4 hover:scale-[1.03]"
                  onClick={() => navigate(`/player/${mainMovie.id}`)}
                >
                  <span>Watch</span>
                  <Play className="scale-95 md:scale-125 duration-300" />
                </button>
              </div>
              {media == 'tv' ? (
                <div className="flex items-center gap-4 md:gap-6 flex-wrap mt-1">
                  {buttons}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div>
          <div className="overflow-hidden">
            <div className="flex items-center justify-between py-4 mx-2 md:mx-4">
              <h3 className="font-bold text-2xl md:text-3xl">Trending Now</h3>
              <WatchModeToggle />
            </div>

            <div className="glide-01 relative w-full">
              <div data-glide-el="track">
                <ul className="whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform] relative  flex w-full overflow-hidden p-0">
                  <>
                    {trendingNow?.map((item, i) => {
                      return <MovieCard movie={item} key={i} />;
                    })}
                  </>
                </ul>
              </div>
            </div>
          </div>

          <div className="overflow-hidden">
            <div className="flex items-center justify-between py-4 mx-2 md:mx-4">
              <h3 className="font-bold text-2xl md:text-3xl">Highest Rated</h3>
              <WatchModeToggle />
            </div>

            <div className="glide-02 relative w-full">
              <div data-glide-el="track">
                <ul className="whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform] relative  flex w-full overflow-hidden p-0">
                  <>
                    {ratedResultsFiltered?.map((item, i) => {
                      return <MovieCard movie={item} key={i} />;
                    })}
                  </>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
