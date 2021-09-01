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

async function getCategoryInfo(id) {
  /**
   * Miniflux currently does not have an endpoint for a single category,
   * so need to get all and filter
   */
  const url = `${minifluxBaseURL}/v1/categories`;
  const categories = (await axios.get(url, config)).data;

  const category = categories.filter((curr) => {
    if (parseInt(curr.id, 10) === parseInt(id, 10)) {
      return true;
    }

    return false;
  });

  // Return first item because filter() returns an array
  return category[0];
}

/* GET category */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const category = await getCategoryInfo(id);
  res.send(category);
});

/* GET category entries */
router.get('/:id/entries', async (req, res) => {
  const { id } = req.params;
  const url = `${minifluxBaseURL}/v1/entries?category_id=${id}&order=published_at&direction=desc`;
  const entriesData = (await axios.get(url, config)).data;

  // Until miniflux/v2#1059 is addressed, need to make separate call to add enclosures
  const entriesWithEnclosures = await Promise.all(entriesData.entries.map(async (entry) => {
    const enclosures = await getEntryEnclosures(entry.id);

    return { ...entry, enclosures };
  }));

  const category = await getCategoryInfo(id);

  // Reconstruct response with entries with enclosures
  res.send({ total: entriesData.total, entries: entriesWithEnclosures, category });
});

module.exports = router;
