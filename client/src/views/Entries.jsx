import axios from 'axios';
import React from 'react';
import EntryTile from '../components/EntryTile';
import Loader from '../components/Loader';
import { ErrorMessage, WarningMessage } from '../components/Alert';

class Entries extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      entries: [],
      error: '',
      loading: false,
      title: '',
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { group, id } = match.params;

    this.loadEntries(group, id);
  }

  async loadEntries(group, id) {
    this.setState({
      loading: true,
    });

    if (group && id) {
      const response = (await axios.get(`/${group}/${id}/entries`)).data;
      const { entries } = response;
      const feed = response.feed || null;

      let title;
      switch (group) {
        case 'categories':
          title = response.category.title;
          break;
        case 'feeds':
          title = response.feed.title;
          break;
        default:
          title = '';
      }

      // If single feed, check for error
      const error = feed ? feed.parsing_error_message : '';

      this.setState({
        entries,
        error,
        loading: false,
        title,
      });
    } else {
      // If no group/ID, get all entries
      const { entries } = (await axios.get('/entries')).data;

      this.setState({
        entries,
        loading: false,
      });
    }
  }

  render() {
    const {
      entries,
      error,
      loading,
      title,
    } = this.state;

    if (loading) {
      return (
        <Loader />
      );
    }

    return (
      <>
        <h1>
          {title}
        </h1>
        {error && (
          <ErrorMessage title="Error" className="mb-6">{error}</ErrorMessage>
        )}
        {!entries.length && (
          <WarningMessage className="mb-6">There are no articles for this feed.</WarningMessage>
        )}
        <div className="grid grid-cols-3 gap-4">
          {entries.map((entry) => (
            <EntryTile
              key={entry.id}
              feed={entry.feed.title}
              id={entry.id}
              published={entry.published_at}
              status={entry.status}
              title={entry.title}
            />
          ))}
        </div>
      </>
    );
  }
}

export default Entries;
