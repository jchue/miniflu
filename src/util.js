import axios from 'axios';

const minifluxAPIKey = process.env.MINIFLUX_API_KEY;
const minifluxBaseURL = process.env.MINIFLUX_BASE_URL;

const headers = {
  'X-Auth-Token': minifluxAPIKey,
};
const config = {
  headers,
};

async function getEntryEnclosures(id) {
  const url = `${minifluxBaseURL}/v1/entries/${id}`;
  const { enclosures } = (await axios.get(url, config)).data;

  return enclosures;
}

export { getEntryEnclosures };
