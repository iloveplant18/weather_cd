import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware"
import type { SettingsStorage } from "../Types/types.ts";
import { TemperatureType } from "../Types/types.ts";

const useSettingsStore = create<SettingsStorage>()(
  persist((set, get) => ({
    temperatureType: TemperatureType.Celsius,
    isWeatherAtHomePageShown: true,
    setTemperatureType: (newTemperatureType: TemperatureType) => set(() => ({ temperatureType: newTemperatureType })),
    toggleIsWeatherAtHomePageShown: () => set(() => ({ isWeatherAtHomePageShown: !get().isWeatherAtHomePageShown })),
  }),
  {
    name: "settings",
    storage: createJSONStorage(() => localStorage)
  })
);

export default useSettingsStore;
