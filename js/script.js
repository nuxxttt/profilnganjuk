document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '8211b89f281f478b90f143003240710';
    const city = 'Nganjuk';
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    const weatherWidget = document.getElementById('weather-widget');

    // Fungsi untuk mengambil data cuaca
    async function fetchWeather() {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            updateWeatherWidget(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            weatherWidget.innerHTML = '<div class="weather-error">Gagal memuat data cuaca</div>';
        }
    }

    // Fungsi untuk memperbarui widget cuaca
    function updateWeatherWidget(data) {
        const location = data.location.name;
        const country = data.location.country;
        const tempC = data.current.temp_c;
        const conditionText = data.current.condition.text;
        const conditionIcon = `https:${data.current.condition.icon}`;
        const isDay = data.current.is_day;
        const localtime = data.location.localtime;
        const uv = data.current.uv;

        // Menentukan warna berdasarkan UV Index
        let uvLevel = '';
        if (uv <= 2) {
            uvLevel = 'Low';
        } else if (uv <= 5) {
            uvLevel = 'Moderate';
        } else if (uv <= 7) {
            uvLevel = 'High';
        } else if (uv <= 10) {
            uvLevel = 'Very High';
        } else {
            uvLevel = 'Extreme';
        }

        // Menentukan warna tema berdasarkan siang atau malam
        const themeColor = isDay ? '#f39c12' : '#34495e';

        // Membuat HTML untuk widget cuaca
        weatherWidget.innerHTML = `
          <div class="weather-container" style="background-color: ${themeColor};">
            <img src="${conditionIcon}" alt="${conditionText}" class="weather-icon">
            <div class="weather-info">
              <div class="weather-temp">${tempC}°C</div>
              <div class="weather-condition">${conditionText} (UV: ${uv} - ${uvLevel})</div>
            </div>
          </div>
        `;
    }

    // Panggil fungsi untuk mengambil data cuaca saat halaman dimuat
    fetchWeather();
});