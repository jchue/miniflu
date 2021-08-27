import axios from 'axios';
import React from 'react';
import EntryTile from '../components/EntryTile';

class Entries extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      entries: [],
      title: '',
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { group, id } = match.params;

    this.loadEntries(group, id);
  }

  async loadEntries(group, id) {
    const { entries, feed } = (await axios.get(`/${group}/${id}/entries`)).data;

    let title;
    switch (group) {
      case 'categories':
        // Derive category title from first entry
        title = entries[0].feed.category.title;
        break;
      case 'feeds':
        title = feed.title;
        break;
      default:
        title = '';
    }

    this.setState({
      entries,
      title,
    });
  }

  render() {
    const { entries, title } = this.state;

    return (
      <>
        <h1>
          {title}
        </h1>
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
