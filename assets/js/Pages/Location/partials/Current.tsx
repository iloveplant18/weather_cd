import Loading from "../../../Components/Loading.tsx";
import useFetch from "../../../Hooks/useFetch.ts";
import type { CurrentWeather } from "../../../Types/types.ts";
import { TemperatureType } from "../../../Types/types.ts";
import WeatherRepository from "../../../Repositories/WeatherRepository.ts";
import { useParams } from "react-router";
import useSettingsStore from "../../../Stores/SettingsStore.ts";

const weatherRepository = new WeatherRepository();

function Current() {
  const { locationId } = useParams();
  const locationIdNumber = Number(locationId);

  const getCurrentWeather = () => weatherRepository.getCurrentWeatherByLocaitonId(locationIdNumber);
  const { data: currentWeather, error: currentWeatherError } = useFetch<CurrentWeather>(getCurrentWeather);

  const temperatureType = useSettingsStore((state) => state.temperatureType);

  return (
    <div className="glass-block min-h-60 row-span-full px-4 py-3 flex flex-col text-2xl gap-y-1 text-center relative overflow-hidden">
      {currentWeatherError ? <span>Something goes wrong...</span> : !currentWeather ? <Loading /> : (
        <>
          <h3 className="font-bold">Current info</h3>
          <div className="glass-block py-3 px-4">
            <span>Temperature:</span>{" "}
            <span className="font-bold">
              {temperatureType === TemperatureType.Celsius
                ? <>{currentWeather.current.temp_c}&nbsp;C</>
                : <>{currentWeather.current.temp_f}&nbsp;F</>}
            </span>
          </div>
          <div className="glass-block py-3 px-4">
            <span>Feels like:</span>{" "}
            <span className="font-bold">
              {temperatureType === TemperatureType.Celsius
                ? <>{currentWeather.current.feelslike_c}&nbsp;C</>
                : <>{currentWeather.current.feelslike_f}&nbsp;F</>}
            </span>
          </div>
          <div className="glass-block py-3 px-4">
            <span>Condition:</span>{" "}
            <span className="font-bold">
              {currentWeather?.current.condition.text}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

export default Current;
