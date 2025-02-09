import BaseSetting from "./BaseSetting.tsx";
import Toggle from "../../../Components/Toggle.tsx";
import useSettingsStore from "../../../Stores/SettingsStore.ts";

function IsWeatherShownAtHomePageToggle() {
  const isWeatherAtHomePageShown = useSettingsStore((state) => state.isWeatherAtHomePageShown);
  const toggleIsWeatherAtHomePageShown = useSettingsStore((state) => state.toggleIsWeatherAtHomePageShown);

  return (
    <BaseSetting title="Show current weather at home page">
      <>
        <Toggle
          onChange={toggleIsWeatherAtHomePageShown}
          checked={isWeatherAtHomePageShown}
        />
        <div className="flex justify-between">
          <span>Off</span>
          <span>On</span>
        </div>
      </>
    </BaseSetting>
  );
}

export default IsWeatherShownAtHomePageToggle;
