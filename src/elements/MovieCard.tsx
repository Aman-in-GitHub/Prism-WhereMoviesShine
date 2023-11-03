import { Play, Star } from 'lucide-react';
import genre from '../../genre';
import { useNavigate } from 'react-router-dom';
import { useMedia } from '@/context/WatchContextProvider';

const MovieCard = ({ movie, mediaType }) => {
  const { media, setMedia } = useMedia();

  const type = mediaType || media;

  const navigate = useNavigate();

  const bgLink = `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`;

  function getNamesByIds(id) {
    const genreObj = genre.find((item) => item.id === id);
    return genreObj ? genreObj.name : 'Unknown';
  }

  return (
    <>
      <div
        className="h-72 w-[500px] md:w-[400px] lg:w-[450px] bg-cover bg-no-repeat bg-center relative font-primary group cursor-pointer"
        onClick={() => {
          setMedia(type);
          navigate(`/media-info/${movie?.id}`, {
            state: { mediaType: type }
          });
        }}
        style={{
          backgroundImage: bgLink,
          color: 'white'
        }}
      >
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-40">
          <div className="bg-dark_purple h-20 w-20 relative rounded-[100%] scale-0 group-hover:scale-[1.1] duration-300 hover:bg-light_purple group">
            <Play className="scale-150 absolute top-[50%] left-[53%] translate-x-[-50%] translate-y-[-50%]" />
          </div>
        </div>
        <div
          style={{
            background: 'rgba(0, 0, 0, 0.5)',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
        ></div>
        <div className="z-40 absolute right-4 top-4">
          <span
            className="border-2 px-1 py-0.5"
            style={{
              borderColor: 'white'
            }}
          >
            {movie?.adult ? '18+' : 'PG 13'}
          </span>
        </div>

        <div
          className="absolute z-40 bottom-0 font-semibold w-full px-2 py-1"
          style={{
            color: 'white'
          }}
        >
          <h2 className="text-lg md:text-2xl">
            {movie?.title || movie?.name
              ? type == 'movie'
                ? movie?.title
                : movie?.name
              : 'Movie Title'}
          </h2>
          <div className="flex items-center justify-between md:my-1">
            <div>
              <span className="text-sm md:text-base">
                {movie.genre_ids && movie.genre_ids?.length > 0 ? (
                  movie.genre_ids.map((item, i) => (
                    <span
                      key={i}
                      className="text-sm font-semibold md:text-base"
                    >
                      {i > 0 && <span className="text-dark_purple"> | </span>}
                      {getNamesByIds(item)}
                    </span>
                  ))
                ) : (
                  <span className="text-sm font-semibold md:base">
                    Genre | Genre
                  </span>
                )}
              </span>
            </div>

            <div className="flex items-center gap-2 font-semibold">
              <Star className="text-dark_purple" />
              <span>{movie?.vote_average?.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
