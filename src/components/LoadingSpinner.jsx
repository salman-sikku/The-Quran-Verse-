import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className='loading-spinner-overlay'>
            <div className="loading-spinner-container">
                <div className="loading-spinner"></div>
            </div>
        </div>
    );
};

export default LoadingSpinner;
