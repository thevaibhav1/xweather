import { useState, useEffect } from "react";
import "./App.css";
function App() {
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!search) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=46bf2ec8022d4419b7562144250107&q=${search}`
        );
        const data = await response.json();
        setWeather([
          { label: "Temperature", value: `${data.current.temp_c}°C` },
          { label: "Humidity", value: `${data.current.humidity}%` },
          { label: "Condition", value: data.current.condition.text },
          { label: "Wind Speed", value: `${data.current.wind_kph} kph` },
        ]);
      } catch (err) {
        alert("Failed to fetch weather data");
      }
      setLoading(false);
    };

    fetchData();
  }, [search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== "") {
      setSearch(city.trim()); // Triggers useEffect
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Enter city name"
          onChange={(e) => setCity(e.target.value)}
          value={city}
        />
        <button type="submit">Search</button>
      </form>

      <div className="weather-cards">
        {loading ? (
          <p>Loading...</p>
        ) : (
          weather.map((wea, idx) => (
            <div key={idx} className="weather-card">
              <p>{wea.label}</p>
              <p> {wea.value}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default App;
