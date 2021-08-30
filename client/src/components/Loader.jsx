import React from 'react';
import './Loader.css';

function Loader() {
  return (
    <div className="h-full flex flex-col justify-center pb-40 text-center">
      <span><i className="loader block m-auto mb-4" /></span>
      <span className="text-gray-800">Loading...</span>
    </div>
  );
}

export default Loader;
