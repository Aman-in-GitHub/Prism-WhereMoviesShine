import { useEffect, useState } from 'react';
import { CalendarDays, Timer, Star, Play } from 'lucide-react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import Loader from '@/elements/Loader';

import { useMedia } from '@/context/WatchContextProvider';

const MediaInfo = () => {
  const location = useLocation();

  const { media } = useMedia();

  const { state } = location;

  const mediaType = state ? state.mediaType : null;

  const type = mediaType || media;

  const controller = new AbortController();

  const [loading, setLoading] = useState(true);

  const params = useParams();
  const id = params.id;

  const [mainMovie, setMainMovie] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}&append_to_response=images`;

    async function getMovieInfo() {
      try {
        const res = await fetch(url, { signal: controller.signal });
        const data = await res.json();

        setMainMovie(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    getMovieInfo();

    return () => {
      controller.abort();
    };
  }, []);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const isLargeScreen = window.innerWidth >= 726;

  const filteredFilePathsLarge = mainMovie.images?.backdrops
    .filter((image) => image.height)
    .map((image) => image.file_path);

  const filteredSmallImage = mainMovie.images?.posters
    .filter((image) => image.height)
    .map((image) => image.file_path);

  const smallImage = filteredSmallImage ? filteredSmallImage[0] : '';

  const largeImage = filteredFilePathsLarge ? filteredFilePathsLarge[0] : '';

  const heroImageLink = isLargeScreen ? largeImage : smallImage;

  const buttons = [];

  if (type == 'tv') {
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
    <main className="font-primary">
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
                {type == 'movie'
                  ? mainMovie?.title
                  : mainMovie?.name || 'Movie Title'}
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
                    {type == 'movie'
                      ? mainMovie.release_date
                      : mainMovie.first_air_date}
                  </span>
                </div>
                <div className="flex items-center gap-2 font-semibold">
                  <Timer className="text-dark_purple" />
                  <span>
                    {type === 'movie'
                      ? mainMovie.runtime + ' min'
                      : mainMovie.number_of_seasons}

                    {type === 'tv'
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
                    {mainMovie?.adult ? '18+' : 'PG 13'}
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
              {type == 'tv' ? (
                <div className="flex items-center gap-4 md:gap-6 flex-wrap mt-1">
                  {buttons}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MediaInfo;
