const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const regression = require('regression');  // Import the regression package

// Initialize express app
const app = express();

// Set the port
const port = 5000;

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse incoming JSON requests

// Sample route for testing the server
app.get('/', (req, res) => {
  res.send('Energy Consumption Forecasting Backend is running!');
});

// Example route for predicting energy consumption using regression model
app.post('/forecast', (req, res) => {
  const { historicalData } = req.body; // Receive data from frontend

  if (!historicalData || historicalData.length === 0) {
    return res.status(400).json({ error: 'No historical data provided' });
  }

  // Prepare the data for regression (convert to format needed by regression model)
  const dataForRegression = historicalData.map(entry => [new Date(entry.time).getTime(), entry.usage]);

  // Perform linear regression
  const result = regression.linear(dataForRegression);

  // Get the predicted value for the next day (using the last time point + 1)
  const nextTime = new Date(historicalData[historicalData.length - 1].time).getTime() + 86400000; // Add 1 day in milliseconds
  const forecastedEnergy = result.predict(nextTime)[1];

  // Respond with the forecasted energy
  res.json({ forecastedEnergy });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});




