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

/* GET entries */
router.get('/', async (req, res) => {
  const url = `${minifluxBaseURL}/v1/entries?order=published_at&direction=desc`;

  const entries = (await axios.get(url, config)).data;
  res.send(entries);
});

/* GET entry */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const url = `${minifluxBaseURL}/v1/entries/${id}`;

  const entries = (await axios.get(url, config)).data;
  res.send(entries);
});

module.exports = router;
