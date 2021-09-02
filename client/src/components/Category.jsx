import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDownIcon, ChevronRightIcon, RssIcon } from '@heroicons/react/outline';

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
      <li className="font-bold list-none mb-2 pl-0 text-xs">
        <span className="flex flex-row cursor-pointer hover:bg-gray-200 text-gray-600 transition-colors">
          {expanded ? <ChevronDownIcon onClick={this.toggle} className="box-content flex-grow-0 h-4 inline pl-4 pr-2 py-2 w-4" /> : <ChevronRightIcon onClick={this.toggle} className="box-content flex-grow-0 h-4 inline pl-4 pr-2 py-2 w-4" />}
          {' '}
          <Link to={`/categories/${category.id}`} className="flex-grow pr-4 py-2 text-gray-600 transition-colors">{category.title}</Link>
        </span>
        <FeedList feeds={category.feeds} expanded={expanded} />
      </li>
    );
  }
}

function FeedList({ feeds, expanded }) {
  return (
    <ul className={`mb-0 overflow-hidden pl-0 transition-all ${expanded ? 'max-h-screen' : 'max-h-0'}`}>
      {feeds.map((feed) => (
        <li key={feed.id} className="font-normal list-none normal-case pl-0 text-xs">
          <Link to={`/feeds/${feed.id}`} className="block px-10 py-2 hover:bg-gray-200 truncate text-gray-600 transition-colors">
            {(feed.icon && (
              <img src={`data:${feed.icon.data}`} alt={feed.title} className="align-middle h-4 inline-block mr-2 w-4" />
            )) || (
              <RssIcon className="align-middle h-4 inline-block mr-2 w-4" />
            )}
            <span className="align-middle">{feed.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Category;
