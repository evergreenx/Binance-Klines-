import React, { useEffect, useState } from "react";
import axios from "axios";
import { createChart } from "lightweight-charts";

const App = () => {
  const chart = createChart(document.body, { width: 800, height: 300 });
  const lineSeries = chart.addLineSeries({
   });

  const [data, setdata] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.binance.com/api/v3/klines?interval=1h&symbol=BTCUSDT")
      .then((response) => {
       

        let data = response.data;

        let objects = data.map(function (x) {
          return {
            time: x[0] / 100,
            value: x[4],
          };
        });
     


	
    
        lineSeries.setData(
          objects.map((i) => {
            return { time: i.time, value: i.value };
          })
        );
      });
  }, [setdata]);

  return (
    <div className="app">
      <h1>Lightweight TradingView Chart with data from Binance klines api</h1>
      <p>This is a simple boilerplate for using React with Electron</p>

    </div>
  );
};

export default App;
