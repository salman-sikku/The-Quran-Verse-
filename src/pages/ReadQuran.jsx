import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal } from 'antd';
import { Helmet } from 'react-helmet';

const juzData = [
    { juz: 1, startPage: 1, endPage: 21 },
    { juz: 2, startPage: 22, endPage: 41 },
    { juz: 3, startPage: 42, endPage: 61 },
    { juz: 4, startPage: 62, endPage: 81 },
    { juz: 5, startPage: 82, endPage: 101 },
    { juz: 6, startPage: 102, endPage: 121 },
    { juz: 7, startPage: 122, endPage: 141 },
    { juz: 8, startPage: 142, endPage: 161 },
    { juz: 9, startPage: 162, endPage: 181 },
    { juz: 10, startPage: 182, endPage: 201 },
    { juz: 11, startPage: 202, endPage: 221 },
    { juz: 12, startPage: 222, endPage: 231 },
    { juz: 13, startPage: 242, endPage: 261 },
    { juz: 14, startPage: 262, endPage: 281 },
    { juz: 15, startPage: 282, endPage: 301 },
    { juz: 16, startPage: 302, endPage: 321 },
    { juz: 17, startPage: 322, endPage: 341 },
    { juz: 18, startPage: 342, endPage: 361 },
    { juz: 19, startPage: 362, endPage: 381 },
    { juz: 20, startPage: 382, endPage: 401 },
    { juz: 21, startPage: 402, endPage: 421 },
    { juz: 22, startPage: 422, endPage: 441 },
    { juz: 23, startPage: 442, endPage: 461 },
    { juz: 24, startPage: 462, endPage: 481 },
    { juz: 25, startPage: 482, endPage: 501 },
    { juz: 26, startPage: 502, endPage: 521 },
    { juz: 27, startPage: 522, endPage: 541 },
    { juz: 28, startPage: 542, endPage: 561 },
    { juz: 29, startPage: 562, endPage: 581 },
    { juz: 30, startPage: 582, endPage: 604 }
];


function ReadQuran() {
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPages, setMaxPages] = useState(604);
    const [svgUrl, setSvgUrl] = useState('');
    const [juzInfo, setJuzInfo] = useState(juzData);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        fetchSvg(currentPage);
    }, [currentPage]);


    const fetchSvg = async (pageNumber) => {
        try {
            const response = await axios.get(`https://www.mp3quran.net/api/quran_pages_svg/${pageNumber.toString().padStart(3, '0')}.svg`);
            setSvgUrl(response.data);
        } catch (error) {
            console.error('Error fetching SVG:', error);
        }
    };

    const handleNextPage = () => {
        setCurrentPage(Math.min(currentPage + 1, maxPages));
    };

    const handlePrevPage = () => {
        setCurrentPage(Math.max(currentPage - 1, 1));
    };

    const handlePageInputChange = (event) => {
        const inputPage = parseInt(event.target.value);
        if (!isNaN(inputPage) && inputPage >= 1 && inputPage <= maxPages) {
            setCurrentPage(inputPage);
        }
    };

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content="Read and listen to the Quran online. Explore our comprehensive collection of recitations and translations. Start your spiritual journey today!" />
                <meta name="keywords" content="Quran, Quran reading, Quran listening, Quran online, Quran recitations, Quran translations, Islamic studies" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="http://quranverse.site/read/quran" />
                <link rel="canonical" href="http://quranverse.site" />
                <title>Only Read Quran - Quranverse.site </title>
            </Helmet>
            <div className='quranReadSVGContainer'>
                <div className="quran-preview">
                    {svgUrl ? (
                        <img src={`data:image/svg+xml;base64,${btoa(svgUrl)}`} alt="Quran Page" />
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
                <div className='page-num'>
                    <h3>Page num: {currentPage}</h3>
                </div>
                <div className="controls">
                    <button onClick={() => setVisible(true)} >Juz(para) Info</button>
                    <div>
                        <span>Find page</span>
                        <input type="text" onChange={handlePageInputChange} />
                    </div>
                    <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                    <button onClick={handleNextPage} disabled={currentPage === maxPages}>Next</button>
                </div>
            </div>
            <Modal onCancel={() => setVisible(false)} footer={false} visible={visible}>
                <div className='infoJuz'>
                    <h2>Information about juz</h2>
                    <ul>
                        {juzInfo.map((curElm, index) => (
                            <li key={index}>
                                <h3>Juz(para) {curElm.juz} startPage: {curElm.startPage}, endPage: {curElm.endPage}</h3>
                            </li>
                        ))}
                    </ul>
                </div>
            </Modal>

        </>
    )
}

export default ReadQuran;
