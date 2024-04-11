require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/search', async (req, res) => {
  try {
    const { data } = await axios.get(`https://api.duckduckgo.com/?q=${req.query.q}&format=json`);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
