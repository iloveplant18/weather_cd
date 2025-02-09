import { FetchError, Forecast as ForecastType, TemperatureType } from "../../../Types/types.ts";
import Loading from "../../../Components/Loading.tsx";
import { Link } from "react-router";
import useSettingsStore from "../../../Stores/SettingsStore.ts";

type ForecastProps = {
  forecast: ForecastType | null;
  forecastError: FetchError;
  locationId: number;
};

function Forecast({ forecast, forecastError, locationId }: ForecastProps) {
  const temperatureType = useSettingsStore((state) => state.temperatureType);

  return (
    <div className="relative glass-block py-4 px-4 lg:px-6 md:col-span-2 lg:col-span-3 overflow-hidden">
      {forecastError
        ? (
          <div className="absolute inset-0 flex justify-center items-center">
            Pupupu...
          </div>
        )
        : !forecast
        ? <Loading />
        : (
          <div className="h-full flex flex-col gap-3">
            {forecast.forecast.forecastday.map((forecastDay, index) => (
              <Link
                className="flex-1 py-2 px-3 glass-block flex justify-between items-center gap-x-2 text-xl md:text-2xl
                  hover:scale-[102%] hover:outline-base hover:outline-solid hover:outline-2 focus-visible:scale-[102%] focus-visible:outline-base focus-visible:outline-2
                  focus-visible:outline-offset-0 transition-all"
                to={`/location/${locationId}/${forecastDay.date}`}
                key={index}
              >
                <span>
                  {forecastDay.date}
                </span>
                <span>
                  {forecastDay.day.condition.text}
                </span>
                <span>
                  {temperatureType === TemperatureType.Fahrenheit
                    ? `${forecastDay.day.avgtemp_f} F`
                    : `${forecastDay.day.avgtemp_c} C`}
                </span>
              </Link>
            ))}
          </div>
        )}
    </div>
  );
}

export default Forecast;
