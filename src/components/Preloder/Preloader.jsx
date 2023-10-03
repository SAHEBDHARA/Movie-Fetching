import React from 'react';
import './Preloader.css'

const Preloader = ({ loading }) => {
  return (
    loading && (
      <div className="preloader">
        <div className="spinner"></div>
      </div>
    )
  );
};

export default Preloader;
