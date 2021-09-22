const express = require('express');
const axios = require('axios');
const util = require('../util');

const { getEntryEnclosures } = util;

const router = express.Router();

const minifluxAPIKey = process.env.MINIFLUX_API_KEY;
const minifluxBaseURL = process.env.MINIFLUX_BASE_URL;

const headers = {
  'X-Auth-Token': minifluxAPIKey,
  'Content-Type': 'application/json',
};
const config = {
  headers,
};

/* GET entries */
router.get('/', async (req, res) => {
  const url = `${minifluxBaseURL}/v1/entries?order=published_at&direction=desc`;
  const entriesData = (await axios.get(url, config)).data;

  // Until miniflux/v2#1059 is addressed, need to make separate call to add enclosures
  const entriesWithEnclosures = await Promise.all(entriesData.entries.map(async (entry) => {
    const enclosures = await getEntryEnclosures(entry.id);

    return { ...entry, enclosures };
  }));

  // Reconstruct response with entries with enclosures
  res.send({ total: entriesData.total, entries: entriesWithEnclosures });
});

/* GET entry */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const url = `${minifluxBaseURL}/v1/entries/${id}`;

  const entries = (await axios.get(url, config)).data;
  res.send(entries);
});

/* PUT entry */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const url = `${minifluxBaseURL}/v1/entries`;
  const data = {
    entry_ids: [parseInt(id, 10)],
    status: req.body.status,
  };

  // TODO: Error handling
  await axios.put(url, data, config);
  res.sendStatus(204);
});

module.exports = router;
