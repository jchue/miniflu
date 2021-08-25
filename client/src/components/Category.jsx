import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/outline';

class Category extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState((prevState) => ({
      expanded: !prevState.expanded,
    }));
  }

  render() {
    const { expanded } = this.state;
    const { category } = this.props;

    return (
      <li className="font-bold mb-2 text-gray-600 text-xs">
        <span className="flex flex-row cursor-pointer hover:bg-gray-100">
          {expanded ? <ChevronDownIcon onClick={this.toggle} className="box-content flex-grow-0 h-4 hover:text-blue-600 inline pl-4 pr-2 py-2 w-4" /> : <ChevronRightIcon onClick={this.toggle} className="box-content flex-grow-0 h-4 hover:text-blue-600 inline pl-4 pr-2 py-2 w-4" />}
          {' '}
          <Link to={`/categories/${category.id}`} className="flex-grow hover:text-blue-600 pr-4 py-2">{category.title}</Link>
        </span>
        <FeedList feeds={category.feeds} expanded={expanded} />
      </li>
    );
  }
}

function FeedList({ feeds, expanded }) {
  return (
    <ul className={`overflow-hidden transition-all ${expanded ? 'max-h-screen' : 'max-h-0'}`}>
      {feeds.map((feed) => (
        <li key={feed.id} className="font-normal normal-case text-gray-600 text-xs">
          <Link to={`/feeds/${feed.id}`} className="block px-10 py-2 hover:bg-gray-100">{feed.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export default Category;
