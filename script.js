const apiKey = '7bda691b9c834e93aa6162607250508';
const button = document.getElementById('weatherBtn');

function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const resultDiv = document.getElementById('weatherResult');

  if (!city) {
    resultDiv.innerHTML = `<p>Please enter a city name.</p>`;
    return;
  }

  // Animate the button
  button.classList.remove('clicked'); // reset if already added
  void button.offsetWidth; // force reflow to restart animation
  button.classList.add('clicked');

  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then((data) => {
      const location = data.location.name;
      const country = data.location.country;
      const temp = data.current.temp_c;
      const condition = data.current.condition.text;
      const icon = data.current.condition.icon;
      const humidity = data.current.humidity;
      const wind = data.current.wind_kph;

      resultDiv.innerHTML = `
        <h2>${location}, ${country}</h2>
        <img src="https:${icon}" alt="Weather Icon">
        <p>🌡 Temperature: <strong>${temp}°C</strong></p>
        <p>🌤 Condition: <strong>${condition}</strong></p>
        <p>💧 Humidity: <strong>${humidity}%</strong></p>
        <p>🌬 Wind: <strong>${wind} kph</strong></p>
      `;
    })
    .catch((error) => {
      resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    });
}
