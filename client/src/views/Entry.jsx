/* eslint-disable camelcase */
import React from 'react';
import axios from 'axios';
import { DateTime } from 'luxon';
import DOMPurify from 'dompurify';
import { ExternalLinkIcon } from '@heroicons/react/outline';

class Entry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      author: '',
      content: '',
      feed: {
        title: '',
        url: '',
      },
      published: '',
      status: '',
      title: '',
      url: '',
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;

    this.loadEntry(id);
  }

  async loadEntry(id) {
    const entry = (await axios.get(`/entries/${id}`)).data;

    this.setState({
      author: entry.author,
      content: entry.content,
      feed: {
        title: entry.feed.title,
        url: entry.feed.site_url,
      },
      published: entry.published_at,
      status: entry.status,
      title: entry.title,
      url: entry.url,
    });
  }

  render() {
    const {
      author,
      content,
      feed,
      published,
      status,
      title,
      url,
    } = this.state;
    const formattedDateTime = DateTime.fromISO(published).toLocaleString(DateTime.DATETIME_MED);
    const cleanContent = DOMPurify.sanitize(content);

    return (
      <article className="m-auto max-w-2xl">
        <header className="mb-8">
          <h1>
            <a href={url} rel="noreferrer" target="_blank" className="text-gray-800 transition-colors">
              <span className="align-middle">{title}</span>
              <ExternalLinkIcon className="align-middle h-5 inline ml-2 w-5" />
            </a>
          </h1>
          <span className="pr-3 text-gray-400">
            <a href={feed.url} rel="noreferrer" target="_blank" className="text-gray-400">
              <span className="align-middle">{feed.title}</span>
              <ExternalLinkIcon className="align-middle h-4 inline ml-1 w-4" />
            </a>

            {/* Only if author exists */}
            {author && (
              <span>
                {` by ${author}`}
              </span>
            )}
          </span>
          <span className="border-gray-300 border-l pl-3 text-gray-400">{formattedDateTime}</span>
          <span className="hidden">{status}</span>
        </header>
        <div dangerouslySetInnerHTML={{ __html: cleanContent }} className="text-gray-800" />
      </article>
    );
  }
}

export default Entry;
