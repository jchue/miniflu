import axios from 'axios';
import React from 'react';
import EntryTile from '../components/EntryTile';

class Entries extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      entries: [],
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;

    this.loadEntries(id);
  }

  async loadEntries(id) {
    const { entries } = (await axios.get(`/feeds/${id}/entries`)).data;

    this.setState({
      entries,
    });
  }

  render() {
    const { entries } = this.state;

    return (
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
    );
  }
}

export default Entries;
