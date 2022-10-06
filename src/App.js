import "./App.css";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { WeatherApp } from "./containers/weatherDetails/WeatherApp";
import { WeatherHistory } from "./containers/weatherDetails/WeatherHistory";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WeatherApp />} exact />
        <Route path="/weather-history/:country" element={<WeatherHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
