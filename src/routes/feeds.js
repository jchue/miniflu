import express from 'express';
import axios from 'axios';

const router = express.Router();

const minifluxAPIKey = process.env.MINIFLUX_API_KEY;
const minifluxBaseURL = process.env.MINIFLUX_BASE_URL;

const headers = {
  'X-Auth-Token': minifluxAPIKey,
};
const config = {
  headers,
};

async function getCategories() {
  const url = `${minifluxBaseURL}/v1/categories`;
  const categories = (await axios.get(url, config)).data;

  return categories;
}

async function getCategoryFeeds(categoryID) {
  const url = `${minifluxBaseURL}/v1/categories/${categoryID}/feeds`;
  const feeds = (await axios.get(url, config)).data;

  return feeds;
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

/* GET feeds listing */
router.get('/', async (req, res) => {
  const feedTree = await getFeedTree();
  res.send(feedTree);
});

/* GET feed entries */
router.get('/:id/entries', async (req, res) => {
  const { id } = req.params;
  const url = `${minifluxBaseURL}/v1/feeds/${id}/entries?order=published_at&direction=desc`;

  const entries = (await axios.get(url, config)).data;
  res.send(entries);
});

module.exports = router;
