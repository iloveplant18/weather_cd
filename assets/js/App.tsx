import { BrowserRouter, Route, Routes } from "react-router";
import DefaultLayout from "./Layouts/DefaultLayout/DefaultLayout.tsx";
import Home from "./Pages/Home/Home.tsx";
import Favorites from "./Pages/Favorites/Favorites.tsx";
import Settings from "./Pages/Settings/Settings.tsx";
import Location from "./Pages/Location/Location.tsx";
import HoursForecast from "./Pages/HoursForecast/HoursForecast.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="settings" element={<Settings />} />
          <Route path="location/:locationId" element={<Location />} />
          <Route path="location/:locationId/:date" element={<HoursForecast />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
