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

  const entries = (await axios.get(url, config)).data;
  const category = await getCategoryInfo(id);
  res.send({ ...entries, category });
});

module.exports = router;
