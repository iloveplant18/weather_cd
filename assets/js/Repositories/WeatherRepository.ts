import { CurrentWeather, Forecast, Location } from "../Types/types.ts";

type QueryParams = { [key: string]: string | number };
type GetRequestParams = {
  url: string;
  queryParams?: QueryParams;
};

class WeatherRepository {
  #baseUrl = "https://api.weatherapi.com/v1";

  async getCurrentWeatherByCoordinates(position: GeolocationPosition): Promise<CurrentWeather> {
    return await this.#get({
      url: "/current.json",
      queryParams: {
        q: `${position.coords.latitude},${position.coords.longitude}`,
      },
    });
  }

  async getMatchingLocations(cityName: string): Promise<Location[]> {
    return await this.#get({
      url: "/search.json",
      queryParams: {
        q: cityName,
      },
    });
  }

  async getForecastByLocationId(locationId: number): Promise<Forecast> {
    return await this.#get({
      url: "/forecast.json",
      queryParams: {
        q: `id:${locationId}`,
        days: 3,
        hour_fields: "condition,time,temp_c,feelslike_c",
        aqi: "no",
        alerts: "no",
      },
    });
  }

  async getCurrentWeatherByLocaitonId(locationId: number): Promise<CurrentWeather> {
    return await this.#get({
      url: "/current.json",
      queryParams: {
        q: `id:${locationId}`,
      },
    });
  }

  async #get({ url, queryParams }: GetRequestParams) {
    const requestUrl = this.#createUrl(url, queryParams);
    const response = await fetch(requestUrl);
    return await response.json();
  }

  #createUrl(url: string, query?: QueryParams): string {
    let queryString = "";
    if (query) {
      queryString = this.#stringifyQuery(query);
    }
    return this.#baseUrl + url + "?key=" + import.meta.env.VITE_WEATHER_API_KEY +
      "&" +
      queryString;
  }

  #stringifyQuery(query: QueryParams): string {
    const result = [];
    for (const key in query) {
      result.push(`${key}=${query[key]}`);
    }
    return result.join("&");
  }
}

export default WeatherRepository;
