// require('dotenv').config();
// const express = require('express');
// const axios = require('axios');
// const cors = require('cors');
// const app = express();
// const PORT = process.env.PORT || 3000;

// // Use your actual OpenWeatherMap API key here
// const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY;

// // Enable CORS for all routes
// app.use(cors());

// app.get('/api/hello', async (req, res) => {
//     const visitorName = req.query.visitor_name || 'Guest';
//     const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
//     const testIp = '8.8.8.8'; // Use a test IP for local testing

//     try {
//         // Get the client's location based on their IP address
//         const locationResponse = await axios.get(`http://ip-api.com/json/${testIp}`);
//         const { city } = locationResponse.data;

//         // Get the current weather for the city
//         const weatherResponse = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`);
//         const temperature = weatherResponse.data.main.temp;

//         // Send the JSON response
//         res.json({
//             client_ip: clientIp,
//             location: city,
//             greeting: `Hello, ${visitorName}! The temperature is ${temperature} degrees Celsius in ${city}.`
//         });
//     } catch (error) {
//         res.status(500).json({ error: 'An error occurred' });
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

//modified the api

require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY;

app.get('/api/hello', async (req, res) => {
    const visitorName = req.query.visitor_name || 'Guest';
    const cityName = req.query.city;

    if (!cityName) {
        return res.status(400).json({ error: 'City name parameter is required.' });
    }

    try {
        const weatherResponse = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`);

        if (weatherResponse.status !== 200) {
            throw new Error(`Weather API returned status ${weatherResponse.status}`);
        }

        const temperature = weatherResponse.data.main.temp;

        res.json({
            client_ip: req.ip,
            location: cityName,
            greeting: `Hello, ${visitorName}🎁! The temperature is ${temperature} degrees Celsius 🎈in ${cityName}🎉 .`
        });
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'An error occurred while fetching weather data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
