import React from 'react';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';

function EntryTile({
  feed,
  id,
  published,
  status,
  title,
}) {
  const date = DateTime.fromISO(published);

  return (
    <Link to={`/entries/${id}`} className="hover:bg-gray-50 p-4 rounded-lg shadow text-left transition-colors">
      <span className="block font-bold mb-2 text-gray-600 text-sm">{title}</span>
      <span className="block mb-0.5 text-gray-400 text-xs">{feed}</span>
      <span className="block text-gray-400 text-xs">{date.toLocaleString(DateTime.DATE_MED)}</span>
      <span className="hidden">{status}</span>
    </Link>
  );
}

export default EntryTile;
