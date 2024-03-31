import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import Banner from '../components/Banner';
import Sura from '../components/Sura';
import LoadingSpinner from '../components/LoadingSpinner';
import RecentReadSura from '../components/RecentReadSura';

function HomePage() {
  const [data, setDate] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Function to get Surat from Api
  const getDataFromApi = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get('https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/quran_en.json');
      setDate(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDataFromApi();
  }, []);

  // Function to handle search query changes
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter data based on search query
  const filteredData = data.filter((item) =>
    item.transliteration.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <title>The Quran Verse - Read, listen</title>
      </Helmet>


      <Banner searchQuery={searchQuery} handleSearch={handleSearch} />
      <RecentReadSura />
      {isLoading ? <LoadingSpinner /> : <Sura data={filteredData} />}
    </>
  );
}

export default HomePage;
