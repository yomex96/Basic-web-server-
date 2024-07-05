document.addEventListener('DOMContentLoaded', () => {
    const weatherForm = document.getElementById('weatherForm');
    const weatherInfo = document.getElementById('weatherInfo');

    weatherForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const visitorName = document.getElementById('visitorName').value;
        const cityName = document.getElementById('cityName').value;

        try {
            const response = await fetch(`http://localhost:3000/api/hello?visitor_name=${visitorName}&city=${cityName}`);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            weatherInfo.innerHTML = `
                <p>Location: ${data.location}</p>
                <p>Greeting: ${data.greeting}</p>
            `;
               // <p>Client IP: ${data.client_ip}</p>
        } catch (error) {
            console.error('Error fetching weather data:', error);
            weatherInfo.innerHTML = '<p>An error occurred while fetching weather data. Please try again.</p>';
        }
    });
});
