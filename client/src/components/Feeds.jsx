import React from 'react';
import axios from 'axios';
import Category from './Category';

class Feeds extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      feeds: [],
    };
  }

  componentDidMount() {
    this.loadFeeds();
  }

  async loadFeeds() {
    const feeds = (await axios.get('/feeds')).data;

    this.setState({
      feeds,
    });
  }

  render() {
    const { feeds } = this.state;

    return (
      <>
        <span className="block mb-2 px-4 text-gray-400 text-xs uppercase">Feeds</span>
        <FeedTree categories={feeds} />
      </>
    );
  }
}

function FeedTree({ categories }) {
  return (
    <ul>
      {categories.map((category) => (
        <Category key={category.id} category={category} />
      ))}
    </ul>
  );
}

export default Feeds;
