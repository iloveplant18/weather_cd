import Toggle from "../../../Components/Toggle.tsx";
import { TemperatureType } from "../../../Types/types.ts";
import useSettingsStore from "../../../Stores/SettingsStore.ts";
import BaseSetting from "./BaseSetting.tsx";

function TemperatureTypeToggle() {
  const temperatureType = useSettingsStore((state) => state.temperatureType);
  const setTemperatureType = useSettingsStore((state) => state.setTemperatureType);

  function handleTemperatureTypeToggle() {
    if (temperatureType === TemperatureType.Celsius) {
      setTemperatureType(TemperatureType.Fahrenheit);
    } else {
      setTemperatureType(TemperatureType.Celsius);
    }
  }

  return (
    <BaseSetting title="Temperature type">
      <>
        <Toggle
          onChange={handleTemperatureTypeToggle}
          checked={temperatureType === TemperatureType.Fahrenheit}
        />
        <div className="flex justify-between">
          <span>C</span>
          <span>F</span>
        </div>
      </>
    </BaseSetting>
  );
}

export default TemperatureTypeToggle;
