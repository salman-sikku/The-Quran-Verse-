import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import bismillha from './../assets/bismillha.png';
import ContntTextCom from '../components/ContntTextCom';
import LoadingSpinner from '../components/LoadingSpinner';
import { Helmet } from 'react-helmet';
import { Select } from "antd";
const { Option } = Select;

const transliterationOptions = [
    { id: 'en', name: 'Translation' },
    { id: 'ur', name: 'Urdu' },
    { id: 'tr', name: 'Turkish' },
    { id: 'id', name: 'Indonesian' },
    { id: 'ru', name: 'Russian' },
    { id: 'fr', name: 'French' },
    { id: 'zh', name: 'Chinese' }
];

function SuraDetail() {
    const params = useParams();
    const [suraOje, setSuraOje] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedTransliteration, setSelectedTransliteration] = useState('en');
    const [isOn, setIsOn] = useState(true);
    const [getname, setGetname] = useState('');

    useEffect(() => {
        if (params?.id) getSuraOje();
    }, [params?.id, selectedTransliteration]);

    const getSuraOje = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/chapters/${selectedTransliteration}/${params?.id}.json`);
            setSuraOje(data);
            setGetname(data.transliteration)
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const handleTransliterationChange = (value) => {
        setSelectedTransliteration(value);
    }

    const handleToggle = () => {
        setIsOn(!isOn);
    };

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content="Read and listen to the Quran online. Explore our comprehensive collection of recitations and translations. Start your spiritual journey today!" />
                <meta name="keywords" content="Quran, Quran reading, Quran listening, Quran online, Quran recitations, Quran translations, Islamic studies" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`http://quranverse.site/sura/detail/${params?.id}`} />
                <link rel="canonical" href="http://quranverse.site" />
                <title>Surat {getname} - {params?.id} - Quranverse.in</title>
            </Helmet>

            {
                loading ? (
                    <LoadingSpinner />
                ) : (
                    isOn ? (<div className='ayahhBodyContainer'>
                        <div className='ayahHeader'>
                            <div className={`slide-button ${isOn ? 'off' : 'on'}`} onClick={handleToggle}>
                                <div className="slider">
                                    {isOn ? (
                                        <>
                                            <span className="text">Translation</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="text">Reading</span>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div>
                                <Select
                                    bordered={false}
                                    placeholder="Select a category"
                                    size="large"
                                    defaultValue="en"
                                    onChange={handleTransliterationChange}
                                >
                                    {transliterationOptions.map((option) => (
                                        <Option key={option.id} value={option.id}>
                                            {option.name}
                                        </Option>
                                    ))}
                                </Select>
                            </div>
                        </div>
                        <h2 className='ayahHeading'>{suraOje.name}</h2>
                        <div className='textImg1Div'>
                            <img
                                src={bismillha}
                                width="400"
                                height="100"
                                className='textImg1'
                                alt="textImg1"
                            ></img>
                        </div>
                        <div className='ayahInfoHeader'>
                            <h3 className='surahTitale'>Surah</h3>
                            <div>
                                <h3>Ayahs</h3>
                                <p>{suraOje.total_verses}</p>
                            </div>
                            <div>
                                <h3>Revelation Place</h3>
                                <p>{suraOje.type}</p>
                            </div>
                        </div>
                        <div className='ayahTextConteiner'>
                            {suraOje.verses.map((data) => (
                                <ContntTextCom
                                    key={data.id}
                                    text={data.text}
                                    id={data.id}
                                    translation={data.translation}
                                />
                            ))}
                        </div>
                    </div>) : (<div className='ayahhBodyContainer'>
                        <div className='ayahHeader'>
                            <div className={`slide-button ${isOn ? 'off' : 'on'}`} onClick={handleToggle}>
                                <div className="slider">
                                    {isOn ? (
                                        <>

                                            <span className="text">Translation</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="text">Reading</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <h2 className='ayahHeading'>{suraOje.name}</h2>
                        <div className='textImg1Div'>
                            <img
                                src={bismillha}
                                width="400"
                                height="100"
                                className='textImg1'
                                alt="textImg1"
                            ></img>
                        </div>
                        <div className='ayahTextConteiner'>
                            {suraOje.verses.map((data) => (
                                <div className='ReadTextConteiner' key={data.id}>
                                    <p>
                                        <span>{data.text}</span>
                                        <span className='ReadTextId'>{data.id}</span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>)
                )
            }
        </>
    )
}

export default SuraDetail;



