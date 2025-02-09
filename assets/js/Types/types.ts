export type CurrentWeather = {
  location: Location;
  current: {
    condition: Condition;
    temp_c: number;
    temp_f: number;
    feelslike_c: number;
    feelslike_f: number;
  };
};

export type FetchError = null | string;
export const enum DeviceType {
  Desktop = "desktop",
  Mobile = "mobile",
}

export type Location = {
  id: number;
  lat: number;
  lan: number;
  name: string;
  region: string;
  country: string;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
};

export type Forecast = {
  location: Location;
  forecast: {
    forecastday: ForecastDay[];
  };
};

export type ForecastDay = {
  date: string;
  date_epoch: number;
  day: Day;
  hour: Hour[];
};

export type Day = {
  maxtemp_c: number;
  mintemp_c: number;
  avgtemp_c: number;
  maxtemp_f: number;
  mintemp_f: number;
  avgtemp_f: number;
  daily_chance_of_rain: 98;
  condition: Condition;
};

export type Hour = {
  time: string;
  temp_c: number;
  temp_f: number;
  feelslike_c: number;
  feelslike_f: number;
  condition: Condition;
};

export type Condition = {
  text: string;
  icon: string;
  code: number;
};

export type FavoriteLocation = {
  name: string;
  region: string | null;
  country: string;
};
export type FavoritesStorage = {
  favorites: { [index: number]: FavoriteLocation };
  addFavoriteLocation: (locationId: number, newFavoriteLocation: FavoriteLocation) => void;
  removeFavoriteLocation: (locationId: number) => void;
  checkIsLocationInStore: (locationId: number) => boolean;
};

export const enum TemperatureType {
  Celsius = "celsius",
  Fahrenheit = "fahrenheit",
}

export type SettingsStorage = {
  temperatureType: TemperatureType;
  isWeatherAtHomePageShown: boolean;
  setTemperatureType: (newTemperatureType: TemperatureType) => void;
  toggleIsWeatherAtHomePageShown: () => void;
};
