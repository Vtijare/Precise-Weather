// ——— Color Background Feature ———

// Major colors extracted from the image
const majorColors = [
  '#1a237e', // Dark Blue / Navy
  '#757575', // Gray
  '#008080', // Teal
  '#ff9800', // Orange
  '#ffeb3b', // Yellow
  '#87ceeb', // Sky Blue
  '#ffffff'  // White
];

// Function to change the background color
function changeBackgroundColor() {
  const randomIndex = Math.floor(Math.random() * majorColors.length);
  const selectedColor = majorColors[randomIndex];
  document.body.style.backgroundColor = selectedColor;
}

// Attach event to button
const colorButton = document.getElementById('colorChangeButton');
if (colorButton) {
  colorButton.addEventListener('click', changeBackgroundColor);
}

// ——— Weather API Integration ———
document.getElementById("getWeatherBtn").addEventListener("click", getWeather);

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");

  if (!city) {
      resultDiv.innerText = "Please enter a city.";
      return;
  }

  const apiKey = "3ff76e8b6efc57781d22c7d6a8161e8b"; // Make sure this is a valid key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
      .then(response => {
          if (!response.ok) {
              throw new Error("City not found");
          }
          return response.json();
      })
      .then(data => {
          const { name, weather, main } = data;
          const description = weather[0].description;
          const temp = main.temp;
          const humidity = main.humidity;

          resultDiv.innerHTML = `
              <h3>Weather in ${name}</h3>
              <p><strong>Temperature:</strong> ${temp}°C</p>
              <p><strong>Condition:</strong> ${description}</p>
              <p><strong>Humidity:</strong> ${humidity}%</p>
          `;
      })
      .catch(error => {
          console.error("Fetch error:", error);
          resultDiv.innerText = "Error fetching weather data.";
      });
}
