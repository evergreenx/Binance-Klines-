import React, { useEffect, useState } from "react";
import axios from "axios";
import { createChart } from "lightweight-charts";

const App = () => {
  const chart = createChart(document.body, { width: 900, height: 400 });
  const lineSeries = chart.addLineSeries({});

    useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = () => {
    // fetching from EndPoint

    let baseUrl = "https://api.binance.com/";
    let klinesApi = "api/v3/klines";

    let api = `${baseUrl}${klinesApi}`;
    axios
      .get(api, {
        params: {
          interval: "1h",
          symbol: "BTCUSDT",
        },
      })
      .then((response) => {
        // set data from api to variable
        let data = response.data;

        // mapping array of array to array object.
        let objects = data.map(function (x) {
          return {
            time: x[0] / 100,
            value: x[4],
          };
        });

        // setting data for chart
        lineSeries.setData(
          objects.map((i) => {
            return { time: i.time, value: i.value };
          })
        );
      });
  };

  return (
    <div className="app">
      <h1>Lightweight TradingView Chart with data from Binance klines api</h1>
    </div>
  );
};

export default App;
