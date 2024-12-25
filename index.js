require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 1414;

// middleware  untuk parsing json
app.use(express.json());
app.use(cors())

// endpoint proxy untuk mengambil data hari libur
app.get('/api/holidays', async (req, res) => {
    const { country = 'ID', year = new Date().getFullYear() } = req.query;

    try {
        // url API HolidayAPI
        const apiUrl = 'https://calendarific.com/api/v2/holidays';
        const response = await axios.get(apiUrl, {
            params: {
                api_key: process.env.HOLIDAY_APIKEY,
                country,
                year,
            }
        })
        res.json(response.data.response.holidays);
        res.setHeader("Access-Control-Allow-Origin", "*")
    } catch (err) {
        console.error("Error fetching holidays", err.message);
        res.status(500).json({ error: 'Failed to fetch holidays' })
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server is running on http://localhost:${PORT}`);
})