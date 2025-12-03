import React, { useState, useEffect } from 'react';

interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: {
    main: string;
    description: string;
  }[];
  wind: {
    speed: number;
  };
  name: string;
}

const Weather: React.FC<{ args: string[] }> = ({ args }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

const Weather: React.FC<{ args: string[] }> = ({ args }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      if (args.length === 0) {
        setError('Please specify a location. Usage: weather [location]');
        setLoading(false);
        return;
      }

      if (!apiKey) {
        setError('OpenWeatherMap API key not found. Please add it to your .env file.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${args.join(' ')}&appid=${apiKey}&units=metric`
        );
        const data = await response.json();
        if (response.ok) {
          setWeather(data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError('Error fetching weather data.');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [args]);


  if (loading) {
    return <div>Loading weather...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!weather) {
    return <div>Error loading weather data.</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold">Weather in {weather.name}</h2>
      <div className="mt-4">
        <p>
          <span className="font-bold">Temperature:</span> {weather.main.temp}°C
        </p>
        <p>
          <span className="font-bold">Feels like:</span> {weather.main.feels_like}°C
        </p>
        <p>
          <span className="font-bold">Humidity:</span> {weather.main.humidity}%
        </p>
        <p>
          <span className="font-bold">Wind speed:</span> {weather.wind.speed} m/s
        </p>
        <p>
          <span className="font-bold">Description:</span> {weather.weather[0].description}
        </p>
      </div>
    </div>
  );
};

export const weather = (args: string[]): React.ReactNode => {
  return <Weather args={args} />;
};
