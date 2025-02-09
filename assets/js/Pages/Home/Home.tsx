import CurrentGeolocationWeather from "./partials/CurrentGeolocationWeather.tsx";
import SearchCity from "./partials/SearchCity.tsx";
import useSettingsStore from "../../Stores/SettingsStore.ts";

function Home() {
  const isWeatherAtHomePageShown = useSettingsStore((store) => store.isWeatherAtHomePageShown);

  return (
    <>
      <h1 className="sr-only">Weather app</h1>
      <section className="h-full flex flex-col container pt-10">
        <h2 className="text-center mb-5 text-4xl font-bold">
          Find your city and see the weather
        </h2>
        <SearchCity />
        {isWeatherAtHomePageShown && <CurrentGeolocationWeather />}
      </section>
    </>
  );
}

export default Home;
