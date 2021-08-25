import React from 'react';
import { useHistory } from 'react-router-dom';

function NotFound() {
  return (
    <div className="h-full flex flex-col justify-center">
      <h1 className="font-bold text-4xl mb-4">404 Not Found</h1>

      <p className="text-lg text-gray-500">
        Sorry, but the page you requested could not be found.
        {' '}
        <Back />
      </p>
    </div>
  );
}

function Back() {
  const history = useHistory();

  return (
    <span role="link" tabIndex={0} onClick={() => history.goBack()} onKeyPress={() => history.goBack()} className="cursor-pointer text-blue-600">Go back.</span>
  );
}

export default NotFound;
