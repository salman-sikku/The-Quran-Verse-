import React from 'react';
import {Link} from 'react-router-dom';
import { Helmet } from 'react-helmet';

function PageNotFound() {
  return (
    <>
       <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:type" content="website" />
        <title>Quranverse.site</title>
      </Helmet>

       <div className='pageNotfound'>
         <div>
            <h2>Sorry, something went wrong</h2>
            <Link className='button' to='/'>Go Back</Link>
         </div>
       </div> 
    </>
  )
}

export default PageNotFound
