import React, { useState, useEffect, useRef } from 'react';
import { IoPlay, IoPause } from "react-icons/io5";
import LoadingSpinner from '../../components/LoadingSpinner';
import { useAudioPlayer } from '../../context/AudioContext';
import { Select } from "antd";
const { Option } = Select;
import { Helmet } from 'react-helmet';

function QuranPlayer() {
  const {
    reciters,
    selectedReciter,
    activeButton,
    volume,
    isLoading,
    suraNames,
    playReciter,
    handleReciterChange,
    recitersMan,
  } = useAudioPlayer(); // Use the context hook to access state;


  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content="Read and listen to the Quran online. Explore our comprehensive collection of recitations and translations. Start your spiritual journey today!" />
        <meta name="keywords" content="Quran, Quran reading, Quran listening, Quran online, Quran recitations, Quran translations, Islamic studies" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://quranverse.site" />
        <link rel="canonical" href="http://quranverse.site" />
        <title>Listening Quran - Quranverse.site </title>
      </Helmet>
      <div className='audioContainer'>
        <div className='audioBanner'>
          {selectedReciter ? (<>
            <div>
              <h3>Playing Surat no. {selectedReciter.name.substr(0, selectedReciter.name.length - 4)}</h3>

              <audio controls key={selectedReciter.link} volume={volume}>
                <source src={selectedReciter.link} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>

          </>) : (<h3 className='msgPlayBanner'>Choose one aspect and listen</h3>)}
          <div className='audioSelect'>
            <Select
              bordered={false}
              placeholder="Select a category"
              size="large"
              defaultValue="bsfr"
              onChange={(value) => handleReciterChange(value)} // Call handleReciterChange with the selected value
            >
              {recitersMan.map((option) => (
                <Option key={option.id} value={option.value}>
                  {option.name}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        {
          isLoading ? (<LoadingSpinner />) : (<div className='read-sura-container'>
            {reciters.map((reciter, index) => (
              <div key={reciter.link} className='read-sura-box'>
                <div
                  className={`playButton ${activeButton === index ? 'Isplaying' : 'notIsplaying'}`}
                  onClick={() => playReciter(reciter, index)}
                  style={{ fontWeight: activeButton === index ? 'bold' : 'normal' }}
                >
                  {activeButton === index ? <IoPause /> : <IoPlay />}
                </div>
                {suraNames[index] && <span>{suraNames[index]}</span>}
              </div>
            ))}
          </div>)
        }
      </div>
    </>
  );
}

export default QuranPlayer;
