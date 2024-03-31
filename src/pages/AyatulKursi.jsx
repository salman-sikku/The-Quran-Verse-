import React from 'react';
import bismillha from '../assets/bismillha.png'
import { IoMdArrowBack } from 'react-icons/io'
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';


export default function Kursi() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content="Read and listen to the Quran online. Explore our comprehensive collection of recitations and translations. Start your spiritual journey today!" />
        <meta name="keywords" content="Quran, Quran reading, Quran listening, Quran online, Quran recitations, Quran translations, Islamic studies" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://quranverse.site/Ayatul-Kursi" />
        <link rel="canonical" href="http://quranverse.site" />
        <title>Ayatul-Kursi - Quranverse.site </title>
      </Helmet>
      <div>
        <div className="ayahhBodyContainer">
          <Link to='/'><button className="backBtn"><IoMdArrowBack style={{ marginTop: '5px' }} /> </button></Link>
          <h2 className="ayahHeading">Ayatul-Kursi</h2>
          <div className="textImg1Div">
            <img
              src={bismillha}
              width={400}
              height={100}
              property={true}
              className="textImg1"
            ></img>
          </div>
          <div className="ReadTextConteiner">
            <p>ٱللَّهُ لَآ إِلَـٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ ۚ لَا تَأْخُذُهُۥ سِنَةٌۭ وَلَا نَوْمٌۭ ۚ لَّهُۥ مَا فِى ٱلسَّمَـٰوَٰتِ وَمَا فِى ٱلْأَرْضِ ۗ مَن ذَا ٱلَّذِى يَشْفَعُ عِندَهُۥٓ إِلَّا بِإِذْنِهِۦ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَىْءٍۢ مِّنْ عِلْمِهِۦٓ إِلَّا بِمَا شَآءَ ۚ وَسِعَ كُرْسِيُّهُ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضَ ۖ وَلَا يَـُٔودُهُۥ حِفْظُهُمَا ۚ وَهُوَ ٱلْعَلِىُّ ٱلْعَظِيمُ ٢٥٥
            </p>
          </div>
        </div>
      </div>
    </>
  );
}


