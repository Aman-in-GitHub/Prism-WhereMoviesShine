import { useParams, useLocation } from 'react-router-dom';

import { useMedia } from '@/context/WatchContextProvider';

const Player = () => {
  const location = useLocation();
  const { media } = useMedia();

  const { state } = location;

  const season = state ? state.season : 1;

  const params = useParams();
  const id = params.id;
  const iframeLink =
    media == 'movie'
      ? `https://vidsrc.to/embed/movie/${id}`
      : `https://vidsrc.to/embed/tv/${id}/${season}`;

  return (
    <>
      <div className="bg-black overflow-hidden">
        <iframe
          src={iframeLink}
          allowFullScreen
          className="absolute top-0 w-full h-full z-50 overflow-hidden"
        ></iframe>
      </div>
    </>
  );
};

export default Player;
