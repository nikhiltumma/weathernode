import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

// Simulated fetch function for demo — replace with real API call as needed
async function getCurrentWeather(city) {
  // For demo, randomly pick weather condition and temp around a base
  const weatherConditions = ['Sunny', 'Rainy', 'Cloudy', 'Stormy', 'Clear'];
  const weatherCondition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
  const temp = 15 + Math.random() * 15; // 15 to 30 °C
  return { name: city, main: { temp }, weather: [{ main: weatherCondition }] };
}

function WeatherChart() {
  const [cityInput, setCityInput] = useState('');
  const [cityName, setCityName] = useState('');
  const [currentTemp, setCurrentTemp] = useState(null);
  const [weatherCondition, setWeatherCondition] = useState('');
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Generate temps array that trends up or down based on weather & base temp
  const generateTempsWithTrend = (baseTemp, weather) => {
    /*
      Trend impact:
      Sunny  => upward trend (+0.5 per step)
      Rainy  => downward trend (-0.5 per step)
      Cloudy => slight downward (-0.2)
      Stormy => strong downward (-0.7)
      Clear  => neutral (0)
    */
    let trend = 0;
    switch (weather) {
      case 'Sunny': trend = 0.5; break;
      case 'Rainy': trend = -0.5; break;
      case 'Cloudy': trend = -0.2; break;
      case 'Stormy': trend = -0.7; break;
      case 'Clear': trend = 0; break;
      default: trend = 0;
    }

    // Generate 5 temperature points with trend and some random noise
    const temps = [];
    for (let i = 0; i < 5; i++) {
      // base + trend*i + noise (-0.3 to +0.3)
      const noise = Math.random() * 0.6 - 0.3;
      temps.push(baseTemp + trend * i + noise);
    }
    return temps;
  };

  const fetchData = async (city) => {
    setLoading(true);
    try {
      const weather = await getCurrentWeather(city);

      const temp = weather.main.temp;
      const condition = weather.weather[0].main;

      setCityName(weather.name);
      setCurrentTemp(temp);
      setWeatherCondition(condition);
      setError(null);

      const labels = ['8 AM', '9 AM', '10 AM', '11 AM', 'Now'];
      const temps = generateTempsWithTrend(temp, condition);

      setChartData({
        labels,
        datasets: [
          {
            label: `Temperature (°C) — ${condition}`,
            data: temps,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgb(75, 192, 192)',
            tension: 0.4,
            pointRadius: 5,
            pointHoverRadius: 7,
          },
        ],
      });
    } catch (err) {
      setError('City not found. Please try again.');
      setChartData(null);
      setCurrentTemp(null);
      setCityName('');
      setWeatherCondition('');
    }
    setLoading(false);
  };

  const handleSearch = () => {
    if (cityInput.trim()) {
      fetchData(cityInput.trim());
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top', labels: { font: { size: 14 } } },
      title: {
        display: true,
        text: 'Temperature Trend by Weather Condition',
        font: { size: 18 },
      },
      tooltip: {
        callbacks: {
          label: ctx => `${ctx.parsed.y.toFixed(1)} °C`,
        },
      },
    },
    scales: {
      y: {
        title: { display: true, text: 'Temperature (°C)', font: { size: 14 } },
        ticks: { stepSize: 1 },
        beginAtZero: false,
      },
      x: {
        title: { display: true, text: 'Time', font: { size: 14 } },
      },
    },
  };

  return (
    <div style={{ width: '90%', maxWidth: 600, margin: '40px auto', textAlign: 'center' }}>
      <h2>Weather Dashboard</h2>

      <input
        type="text"
        placeholder="Enter city name"
        value={cityInput}
        onChange={(e) => setCityInput(e.target.value)}
        style={{ padding: '8px', width: '200px', marginRight: '10px' }}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />

      <button onClick={handleSearch} style={{ padding: '8px 16px' }} disabled={loading}>
        {loading ? 'Loading...' : 'Search'}
      </button>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

      {cityName && (
        <>
          <h3 style={{ marginTop: '20px' }}>City: {cityName}</h3>
          <p style={{ fontSize: '20px', marginBottom: '10px' }}>
            Current Temperature: <strong>{currentTemp.toFixed(1)} °C</strong>
          </p>
          <p style={{ fontSize: '16px', fontStyle: 'italic', color: '#555' }}>
            Weather Condition: <strong>{weatherCondition}</strong>
          </p>
        </>
      )}

      {chartData ? (
        <Line data={chartData} options={options} />
      ) : (
        !loading && <p style={{ marginTop: '20px' }}>No data to display.</p>
      )}
    </div>
  );
}

export default WeatherChart;
