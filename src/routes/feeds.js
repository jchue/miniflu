import express from 'express';
import axios from 'axios';
import { getEntryEnclosures } from '../util';

const router = express.Router();

const minifluxAPIKey = process.env.MINIFLUX_API_KEY;
const minifluxBaseURL = process.env.MINIFLUX_BASE_URL;

const headers = {
  'X-Auth-Token': minifluxAPIKey,
};
const config = {
  headers,
};

async function getFeedIcon(id) {
  const url = `${minifluxBaseURL}/v1/feeds/${id}/icon`;

  let icon;
  try {
    icon = (await axios.get(url, config)).data;
  } catch (error) {
    // No icon
  }

  return icon;
}

async function getCategories() {
  const url = `${minifluxBaseURL}/v1/categories`;
  const categories = (await axios.get(url, config)).data;

  return categories;
}

async function getCategoryFeeds(categoryID) {
  const url = `${minifluxBaseURL}/v1/categories/${categoryID}/feeds`;
  const feeds = (await axios.get(url, config)).data;

  const feedsWithIcons = await Promise.all(feeds.map(async (feed) => {
    const icon = await getFeedIcon(feed.id);

    return { ...feed, icon };
  }));

  return feedsWithIcons;
}

async function getFeedTree() {
  // Get categories
  const categories = await getCategories();

  // Get feeds within each category
  const feedTree = await Promise.all(categories.map(async (category) => {
    const feeds = await getCategoryFeeds(category.id);

    // Return feeds as a property of each category
    return { ...category, feeds };
  }));

  return feedTree;
}

async function getFeedInfo(id) {
  const url = `${minifluxBaseURL}/v1/feeds/${id}`;
  const feed = (await axios.get(url, config)).data;

  return feed;
}

/* GET feeds listing */
router.get('/', async (req, res) => {
  const feedTree = await getFeedTree();
  res.send(feedTree);
});

/* GET feed */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const feed = await getFeedInfo(id);
  res.send(feed);
});

/* GET feed entries */
router.get('/:id/entries', async (req, res) => {
  const { id } = req.params;
  const url = `${minifluxBaseURL}/v1/feeds/${id}/entries?order=published_at&direction=desc`;
  const entriesData = (await axios.get(url, config)).data;

  // Until miniflux/v2#1059 is addressed, need to make separate call to add enclosures
  const entriesWithEnclosures = await Promise.all(entriesData.entries.map(async (entry) => {
    const enclosures = await getEntryEnclosures(entry.id);

    return { ...entry, enclosures };
  }));

  const feed = await getFeedInfo(id);

  // Reconstruct response with entries with enclosures
  res.send({ total: entriesData.total, entries: entriesWithEnclosures, feed });
});

module.exports = router;
