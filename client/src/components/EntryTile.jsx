import React from 'react';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';
import { PhotographIcon } from '@heroicons/react/solid';

function EntryTile({
  feed,
  id,
  published,
  status,
  thumbnail,
  title,
}) {
  const formattedDateTime = DateTime.fromISO(published).toLocaleString(DateTime.DATE_MED);

  let thumbnailTile;
  if (thumbnail) {
    thumbnailTile = <div style={{ backgroundImage: `url(${thumbnail})`, paddingTop: '75%' }} className="bg-center bg-cover mb-3 rounded-lg w-full" />;
  } else {
    thumbnailTile = <div style={{ paddingTop: '75%' }} className="bg-center bg-cover bg-gray-50 mb-3 relative rounded-lg w-full"><PhotographIcon className="absolute text-gray-200 inset-1/3" /></div>;
  }

  return (
    <Link to={`/entries/${id}`} className="hover:bg-gray-100 mb-4 p-4 rounded-lg text-left transition-colors">
      {thumbnailTile}
      <span className="block font-bold leading-snug mb-2 text-gray-600 text-sm">{title}</span>
      <span className="block mb-0.5 text-gray-400 text-xs">{feed}</span>
      <span className="block text-gray-400 text-xs">{formattedDateTime}</span>
      <span className="hidden">{status}</span>
    </Link>
  );
}

export default EntryTile;
