import { useParams } from "react-router";
import useFetch from "../../Hooks/useFetch.ts";
import type { Forecast, Hour } from "../../Types/types.ts";
import { TemperatureType } from "../../Types/types.ts";
import WeatherRepository from "../../Repositories/WeatherRepository.ts";
import Loading from "../../Components/Loading.tsx";
import { useEffect, useState } from "react";
import useSettingsStore from "../../Stores/SettingsStore.ts";

const weatherRepository = new WeatherRepository();

function HoursForecast() {
  const { locationId, date } = useParams();
  const locationIdNumber = Number(locationId);

  const [hours, setHours] = useState<Hour[] | undefined>();

  const getForecast = () => weatherRepository.getForecastByLocationId(locationIdNumber);
  const { data: forecast, error: forecastError } = useFetch<Forecast>(getForecast);

  useEffect(() => {
    if (!forecast) return;

    for (const i of forecast.forecast.forecastday) {
      if (i.date === date) {
        setHours(i.hour);
      }
    }
  }, [forecast]);

  const temperatureType = useSettingsStore((state) => state.temperatureType);

  return (
    <section className="container">
      {
        <h2 className="mt-8 text-3xl md:text-7xl font-kanit font-bold">
          {forecastError
            ? (
              "Something goes wrong"
            )
            : !forecast
            ? <Loading />
            : (
              `${forecast.location.name}: hourly forecast`
            )}
        </h2>
      }
      <div className="relative mt-5">
        {!hours ? <Loading /> : (
          <ul className="space-y-1 overflow-y-auto md:text-2xl">
            {hours.map((hour, index) => (
              <li
                className="glass-block py-3 px-4 flex items-center justify-between flex-wrap gap-x-3 gap-y-1"
                key={index}
              >
                <span>
                  time: {hour.time.split(" ")[1]}
                </span>
                <span>
                  condition: {hour.condition.text}
                </span>
                <span>
                  temp: {temperatureType === TemperatureType.Celsius ? `${hour.temp_c} C` : `${hour.temp_f} F`}
                </span>
                <span>
                  feels&nbsp;like:{" "}
                  {temperatureType === TemperatureType.Celsius ? `${hour.feelslike_c} C` : `${hour.feelslike_f} F`}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default HoursForecast;
