import React from 'react';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';
import { CheckCircleIcon as CheckCircleIconOutline } from '@heroicons/react/outline';
import { CheckCircleIcon as CheckCircleIconSolid, PhotographIcon } from '@heroicons/react/solid';

class EntryTile extends React.Component {
  constructor(props) {
    super(props);

    this.updateStatus = this.updateStatus.bind(this);
  }

  updateStatus(e) {
    // Prevent navigation to entry
    e.preventDefault();

    // Lift state to parent
    const {
      id,
      status,
      onStatusChange,
    } = this.props;

    onStatusChange(id, status === 'unread' ? 'read' : 'unread');
  }

  render() {
    const {
      feed,
      id,
      published,
      status,
      thumbnail,
      title,
    } = this.props;

    const formattedDateTime = DateTime.fromISO(published).toLocaleString(DateTime.DATE_MED);

    let scrim;
    if (status === 'unread') {
      scrim = (
        <div className="absolute bg-black bg-opacity-50 inset-0 opacity-0 group-hover:opacity-100 p-2 rounded-lg transition">
          <i title="Mark as Read" className="float-right h-7">
            <CheckCircleIconOutline className="text-gray-300 hover:text-white w-7" onClick={this.updateStatus} />
          </i>
        </div>
      );
    } else {
      scrim = (
        <div className="absolute bg-black bg-opacity-50 inset-0 opacity-0 group-hover:opacity-100 p-2 rounded-lg transition">
          <i title="Mark as Unread" className="float-right h-7">
            <CheckCircleIconSolid className="text-gray-300 hover:text-white w-7" onClick={this.updateStatus} />
          </i>
        </div>
      );
    }

    let thumbnailTile;
    if (thumbnail) {
      thumbnailTile = (
        <div style={{ backgroundImage: `url(${thumbnail})`, paddingTop: '75%' }} className="bg-center bg-cover mb-3 relative rounded-lg w-full">{scrim}</div>
      );
    } else {
      thumbnailTile = (
        <div style={{ paddingTop: '75%' }} className="bg-center bg-cover bg-gray-50 mb-3 relative rounded-lg w-full">
          <PhotographIcon className="absolute text-gray-200 inset-1/3" />
          {scrim}
        </div>
      );
    }

    return (
      <Link to={`/entries/${id}`} className="hover:bg-gray-100 group mb-4 p-4 rounded-lg text-left transition-colors">
        {thumbnailTile}
        <span className={`block font-bold leading-snug mb-2 text-sm ${status === 'unread' ? 'text-gray-600' : 'text-gray-400'}`}>{title}</span>
        <span className="block mb-0.5 text-gray-400 text-xs">{feed}</span>
        <span className="block text-gray-400 text-xs">{formattedDateTime}</span>
      </Link>
    );
  }
}

export default EntryTile;
