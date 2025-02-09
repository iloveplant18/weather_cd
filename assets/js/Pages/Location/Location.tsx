import { useParams } from "react-router";
import type { Forecast } from "../../Types/types.ts";
import LocationIcon from "../../Components/Icons/LocationIcon.tsx";
import WeatherRepository from "../../Repositories/WeatherRepository.ts";
import useFetch from "../../Hooks/useFetch.ts";
import Current from "./partials/Current.tsx";
import ForecastComponent from "./partials/Forecast.tsx";
import FavoritesButton from "./partials/FavoritesButton.tsx";

const weatherRepository = new WeatherRepository();

function Location() {
  const { locationId } = useParams();
  const locationIdNumber = Number(locationId);

  const getForecast = () => weatherRepository.getForecastByLocationId(locationIdNumber);
  const { data: forecast, error: forecastError } = useFetch<Forecast>(getForecast);

  return (
    <section className="container flex flex-col gap-y-4 h-full">
      <div className="flex items-center gap-x-4 pt-5 mt-auto text-3xl md:text-7xl font-kanit font-bold">
        {forecastError ? "Can't load forecast" : forecast && (
          <>
            <LocationIcon className="md:w-10 md:h-10" />
            <h2>
              {`${forecast.location.name},
              ${forecast.location.region && `${forecast.location.region},`}
              ${forecast.location.country}`}
            </h2>
            <FavoritesButton className="ml-auto" locationId={locationIdNumber} forecast={forecast} />
          </>
        )}
      </div>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Current />
        <ForecastComponent
          forecast={forecast}
          forecastError={forecastError}
          locationId={locationIdNumber}
        />
      </div>
    </section>
  );
}

export default Location;
