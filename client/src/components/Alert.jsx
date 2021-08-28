import React from 'react';
import { ExclamationIcon, XCircleIcon } from '@heroicons/react/solid';

function ErrorMessage({ children, className, title }) {
  return (
    <div className={`bg-red-50 flex flex-row p-5 rounded-lg text-sm ${className}`}>
      <XCircleIcon className="h-5 inline mr-4 mt-0.5 text-red-400 w-5" />
      <div>
        {title && (
          <span className="block font-medium mb-2 text-red-900">{title}</span>
        )}
        <span className="block text-red-500">{children}</span>
      </div>
    </div>
  );
}

function WarningMessage({ children, className, title }) {
  return (
    <div className={`bg-yellow-50 flex flex-row p-5 rounded-lg text-sm ${className}`}>
      <ExclamationIcon className="h-5 inline mr-4 mt-0.5 text-yellow-400 w-5" />
      <div>
        {title && (
          <span className="block font-medium mb-2 text-yellow-900">{title}</span>
        )}
        <span className="block text-yellow-700">{children}</span>
      </div>
    </div>
  );
}

export { ErrorMessage, WarningMessage };
