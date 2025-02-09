import { useEffect, useState } from "react";
import type { CurrentWeather } from "../../../Types/types.ts";
import { TemperatureType } from "../../../Types/types.ts";
import WeatherRepository from "../../../Repositories/WeatherRepository.ts";
import useSettingsStore from "../../../Stores/SettingsStore.ts";
import Loading from "../../../Components/Loading.tsx";

const weatherRepository = new WeatherRepository();

type CurrentWeatherError = null | "no access" | "fetch error" | "no browser support";

function CurrentGeolocationWeather() {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
  const [currentWeatherError, setCurrentWeatherError] = useState<CurrentWeatherError>(null);
  const temepratureType = useSettingsStore((state) => state.temperatureType);

  useEffect(() => {
    getCurrentWeather();
  }, []);

  function getCurrentWeather() {
    setCurrentWeather(null);
    setCurrentWeatherError(null);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => makeGeolocationApiRequest(position),
        (positionError) => {
          setCurrentWeatherError("no access");
          console.log(positionError);
        },
      );
    } else {
      setCurrentWeatherError("no browser support");
    }
  }

  async function makeGeolocationApiRequest(position: GeolocationPosition) {
    try {
      const currentWeather = await weatherRepository.getCurrentWeatherByCoordinates(position);
      setCurrentWeather(currentWeather);
    } catch {
      setCurrentWeatherError("fetch error");
    }
  }

  return (
    <div className="relative glass-block mt-5 overflow-hidden pb-4">
      {!currentWeather && !currentWeatherError && <Loading />}
      <h2 className="text-2xl text-center py-3">
        {currentWeatherError === "no browser support"
          ? "Cant show current weather - Your browser does not support geolocation"
          : currentWeatherError === "no access"
          ? "Cant show current weather - Has no access to geolocation"
          : currentWeatherError === "fetch error"
          ? "Cant show current weather - Check your internet connection"
          : "Current weather"}
      </h2>
      {currentWeather && (
        <ul className="flex items-center flex-col sm:flex-row justify-center gap-x-6 gap-y-3 px-8">
          <li className="glass-block px-4 py-1 text-xl text-center">
            Location: <b>{currentWeather.location.name}</b>
          </li>
          <li className="glass-block px-4 py-1 text-xl text-center">
            Condition: <b>{currentWeather.current.condition.text}</b>
          </li>
          <li className="glass-block px-4 py-1 text-xl text-center">
            Temperature:{" "}
            <b>
              {temepratureType === TemperatureType.Celsius
                ? `${currentWeather.current.temp_c} C`
                : `${currentWeather.current.temp_f} F`}
            </b>
          </li>
        </ul>
      )}
    </div>
  );
}

export default CurrentGeolocationWeather;
