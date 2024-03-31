import React, { createContext, useState, useContext, useRef, useEffect } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';

const AudioPlayerContext = createContext();

const recitersMan = [
  {id: 1, name : 'Abdullah Basfer', value : 'bsfr'},
  {id: 2, name : 'Saleh Al-Habdan', value : 'habdan'},
  {id: 3, name : 'Sahl Yassin', value : 'shl'}
]

export const AudioPlayerProvider = ({ children }) => {
  const [reciters, setReciters] = useState([]);
  const [suraNames, setSuraNames] = useState([]);
  const [selectedReciter, setSelectedReciter] = useState(null);
  const audioElementsRef = useRef({});
  const [activeButton, setActiveButton] = useState(null);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selecterecitersman, setSelecterecitersman] = useState('bsfr');
  
  useEffect(() => {
    const getReciters = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`https://server6.mp3quran.net/${selecterecitersman}/`);
        const $ = cheerio.load(data);
        const links = $('a[href$=".mp3"]');
        const reciterList = links.map((index, element) => ({
          name: $(element).text().trim(),
          link: `https://server6.mp3quran.net/${selecterecitersman}/` + $(element).attr('href')
        })).get();
        setReciters(reciterList);

        const lastPlayedAudio = localStorage.getItem('lastPlayedAudio');
        if (lastPlayedAudio) {
          const reciter = reciterList.find(reciter => reciter.link === lastPlayedAudio);
          if (reciter) {
            setSelectedReciter(reciter);
          }
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching reciters:", error);
        setIsLoading(false);
      }
    };

    const getSuraNames = async () => {
      try {
        const { data } = await axios.get('https://www.mp3quran.net/api/v3/suwar?language=eng');
        setSuraNames(data.suwar.map(surah => surah.name));
      } catch (error) {
        console.log(error);
      }
    };

    getReciters();
    getSuraNames();
  }, [selecterecitersman]);

  useEffect(() => {
    const audio = audioElementsRef.current[selectedReciter?.link];
    if (audio) {
      const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration);
      };
      audio.addEventListener('timeupdate', handleTimeUpdate);

      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [selectedReciter]);

  const playReciter = (reciter, index) => {
    const audio = audioElementsRef.current[reciter.link];

    Object.values(audioElementsRef.current).forEach((audioElement) => {
      if (audioElement !== audio && !audioElement.paused) {
        audioElement.pause();
      }
    });

    if (audio) {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    } else {
      const newAudio = new Audio(reciter.link);
      newAudio.play();
      audioElementsRef.current[reciter.link] = newAudio;
    }
    
    setSelectedReciter(reciter);
    setActiveButton(index === activeButton ? null : index); // Toggle active button state
    localStorage.setItem('lastPlayedAudio', reciter.link);
  };

  const handleNext = () => {
    const currentIndex = reciters.findIndex(reciter => reciter.link === selectedReciter.link);
    const nextIndex = (currentIndex + 1) % reciters.length;
    playReciter(reciters[nextIndex], nextIndex);
  };

  const handlePrev = () => {
    const currentIndex = reciters.findIndex(reciter => reciter.link === selectedReciter.link);
    const prevIndex = (currentIndex - 1 + reciters.length) % reciters.length;
    playReciter(reciters[prevIndex], prevIndex);
  };

  const handleReciterChange = (value) => {
    setSelecterecitersman(value)
  }

  return (
    <AudioPlayerContext.Provider
      value={{
        reciters,
        setReciters,
        selectedReciter,
        setSelectedReciter,
        audioElementsRef,
        activeButton,
        setActiveButton,
        volume,
        setVolume,
        currentTime,
        setCurrentTime,
        duration,
        setDuration,
        playReciter,
        handleNext,
        handlePrev,
        suraNames,
        isLoading,
        handleReciterChange,
        recitersMan,
        selecterecitersman
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = () => useContext(AudioPlayerContext);
