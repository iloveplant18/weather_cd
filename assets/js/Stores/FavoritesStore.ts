import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { FavoriteLocation, FavoritesStorage } from "../Types/types.ts";

const useFavoritesStore = create<FavoritesStorage>()(
  persist(
    (set, get) => ({
      favorites: {},
      addFavoriteLocation: (
        locationId: number,
        newFavoriteLocation: FavoriteLocation,
      ) =>
        set(() => {
          const oldFavorites = get().favorites;
          const newFavorites = { [locationId]: newFavoriteLocation, ...oldFavorites };
          return { favorites: newFavorites };
        }),
      removeFavoriteLocation: (
        locationId: number,
      ) =>
        set(() => {
          const oldFavorites = get().favorites;
          const { [locationId]: _elementToRemove, ...newFavorites } = oldFavorites;
          return { favorites: newFavorites };
        }),
      checkIsLocationInStore: (locationId: number) => Boolean(get().favorites[locationId]),
    }),
    {
      name: "favorites",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useFavoritesStore;
