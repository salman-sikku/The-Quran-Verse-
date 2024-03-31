import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import CustomAudioControls from './components/CustomAudioControls';
import { useAudioPlayer } from './context/AudioContext';

// Lazy-loaded components
const HomePage = lazy(() => import('./pages/HomePage'));
const SuraDetail = lazy(() => import('./pages/SuraDetail'));
const PlayQuranPage = lazy(() => import('./pages/playQuranPage/PlayQuranPage'));
const ReadQuran = lazy(() => import('./pages/ReadQuran'));
const AyatulKursi = lazy(() => import('./pages/AyatulKursi'));
const Yasin = lazy(() => import('./pages/Yasin'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));

const App = () => {
  const { selectedReciter, setSelectedReciter } = useAudioPlayer();
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    setIsAudioPlaying(selectedReciter ? true : false);
  }, [selectedReciter]);

  return (
    <BrowserRouter>
      <Header />
      {isAudioPlaying && <CustomAudioControls setSelectedReciter={setSelectedReciter}/>}
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sura/detail/:id" element={<SuraDetail />} />
          <Route path="/play/quran" element={<PlayQuranPage />} />
          <Route path="/read/quran" element={<ReadQuran />} />
          <Route path="/Ayatul-Kursi" element={<AyatulKursi />} />
          <Route path="/Yaseen" element={<Yasin />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
