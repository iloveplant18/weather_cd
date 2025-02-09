import TemperatureTypeToggle from "./partials/TemperatureTypeToggle.tsx";
import IsWeatherShownAtHomePageToggle from "./partials/IsWeatherShownAtHomePageToggle.tsx";

function Settings() {
  return (
    <section className="container pt-10">
      <h2 className="text-center text-4xl font-bold">Settings</h2>
      <div className="mt-5 flex flex-col gap-y-4n">
        <TemperatureTypeToggle />
        <IsWeatherShownAtHomePageToggle />
      </div>
    </section>
  );
}

export default Settings;
