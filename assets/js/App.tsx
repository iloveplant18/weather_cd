import { HashRouter, Route, Routes } from "react-router";
import DefaultLayout from "./Layouts/DefaultLayout/DefaultLayout.tsx";
import Home from "./Pages/Home/Home.tsx";
import Favorites from "./Pages/Favorites/Favorites.tsx";
import Settings from "./Pages/Settings/Settings.tsx";
import Location from "./Pages/Location/Location.tsx";
import HoursForecast from "./Pages/HoursForecast/HoursForecast.tsx";
import NotFound from "./Pages/NotFound/NotFound.tsx";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="" element={<DefaultLayout />}>
          <Route path="" element={<Home />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="settings" element={<Settings />} />
          <Route path="location/:locationId" element={<Location />} />
          <Route path="location/:locationId/:date" element={<HoursForecast />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
