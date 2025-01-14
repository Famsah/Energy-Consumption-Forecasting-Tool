import React, { useState } from 'react';
import './App.css';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [energyData, setEnergyData] = useState([]);
  const [forecast, setForecast] = useState(null);

  const handleFetchData = async () => {
    // Fetch energy consumption data or use dummy data
    const data = [
      { time: '2024-01-01', usage: 50 },
      { time: '2024-01-02', usage: 45 },
      { time: '2024-01-03', usage: 55 },
    ];
    setEnergyData(data);
  };

  const handleForecastData = async () => {
    // A simple forecast logic or use a model
    const forecastedValue = energyData.length
      ? energyData[energyData.length - 1].usage * 1.1
      : 0;
    setForecast(forecastedValue);
  };

  // Prepare chart data
  const chartData = {
    labels: energyData.map((entry) => entry.time),
    datasets: [
      {
        label: 'Energy Usage (kWh)',
        data: energyData.map((entry) => entry.usage),
        borderColor: '#4BC0C0', // Stylish greenish color
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Energy Consumption Forecasting Tool</h1>
        <p className="tagline">Predict and manage your energy usage efficiently.</p>
        <div className="buttons">
          <button className="btn" onClick={handleFetchData}>
            Load Energy Data
          </button>
          <button className="btn forecast-btn" onClick={handleForecastData}>
            Forecast Energy Consumption
          </button>
        </div>
      </header>

      <section className="content">
        <div className="dashboard">
          <h2 className="section-heading">Energy Usage Data</h2>
          <ul className="data-list">
            {energyData.map((entry, index) => (
              <li key={index}>
                <span>{entry.time}</span>: <strong>{entry.usage} kWh</strong>
              </li>
            ))}
          </ul>
        </div>

        <div className="chart">
          <h2 className="section-heading">Energy Usage Chart</h2>
          <Line data={chartData} />
        </div>

        <div className="forecast">
          <h2 className="section-heading">Forecasted Energy Consumption</h2>
          {forecast !== null ? (
            <p className="forecast-value">{forecast} kWh</p>
          ) : (
            <p className="forecast-info">Click 'Forecast Energy Consumption' to predict.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;







