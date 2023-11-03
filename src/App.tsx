import { lazy, Suspense } from 'react';

import { Route, Routes } from 'react-router-dom';

import Navbar from './elements/Navbar';

import Home from './pages/Home.js';

const Error404 = lazy(() => import('./pages/Error404.js'));
const Player = lazy(() => import('./pages/Player.js'));
const MediaInfo = lazy(() => import('./pages/MediaInfo.js'));
const SearchMovie = lazy(() => import('./pages/SearchMovie'));
import Loader from './elements/Loader.js';
import Footer from './elements/Footer.js';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="player/:id"
          element={
            <Suspense fallback={<Loader />}>
              <Player />
            </Suspense>
          }
        />
        <Route
          path="media-info/:id"
          element={
            <Suspense fallback={<Loader />}>
              <MediaInfo />
            </Suspense>
          }
        />
        <Route
          path="search/:id"
          element={
            <Suspense fallback={<Loader />}>
              <SearchMovie />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<Loader />}>
              <Error404 />
            </Suspense>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
