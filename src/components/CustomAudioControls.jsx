import React, { useState } from 'react';
import { IoPlay, IoPause, IoPlayForward, IoPlayBack } from "react-icons/io5";
import { useAudioPlayer } from '../context/AudioContext';
import { IoClose } from "react-icons/io5";

const CustomAudioControls = ({ setSelectedReciter }) => {
  const { currentTime, duration, audioElementsRef, activeButton, selectedReciter, reciters, playReciter, handlePrev, handleNext, setCurrentTime } = useAudioPlayer();
  const [seeking, setSeeking] = useState(false);

  const selectedIndex = selectedReciter ? reciters.findIndex(reciter => reciter.link === selectedReciter.link) : -1;

  const handleChangeTime = (event) => {
    const newTime = event.target.value;
    audioElementsRef.current[selectedReciter.link].currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleAudioClose = () => {
    if (selectedReciter) {
      const audio = audioElementsRef.current[selectedReciter.link];
      if (audio) {
        audio.pause(); // Pause the audio playback
      }
    }
    setSelectedReciter(null);

  }

  return (
    <div className='custom-audio-controls'>
      <div className='audio-ranges'>
        {/* Display duration range */}
        <input
          type="range"
          min="0"
          max={duration}
          step="1"
          value={seeking ? currentTime : currentTime}
          onChange={handleChangeTime}
          onMouseDown={() => setSeeking(true)}
          onMouseUp={() => setSeeking(false)}
        />
      </div>
      <div className='button-container'>
        <div className='custom-buttons'>
          <button onClick={handlePrev}><IoPlayBack /></button>
          <button onClick={() => playReciter(selectedReciter, selectedIndex)}>
            {activeButton !== null && activeButton === selectedIndex ? <IoPause /> : <IoPlay />}
          </button>
          <button onClick={handleNext}><IoPlayForward /></button>
        </div>
        <span className='closeAudioButton' onClick={handleAudioClose}><IoClose/></span>
      </div>
    </div>
  );
};

export default CustomAudioControls;
