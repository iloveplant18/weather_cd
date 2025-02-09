import StarIcon from "../../../Components/Icons/StarIcon.tsx";
import type { FavoriteLocation, Forecast } from "../../../Types/types.ts";
import useFavoritesStore from "../../../Stores/FavoritesStore.ts";
import { ButtonHTMLAttributes } from "react";
import StarConturIcon from "../../../Components/Icons/StarConturIcon.tsx";

type FavoritesButtonProps = ButtonHTMLAttributes<any> & {
  locationId: number;
  forecast: Forecast | undefined;
};

function FavoritesButton({ locationId, forecast, onClick, ...props }: FavoritesButtonProps) {
  const checkIsLocationInStore = useFavoritesStore((state) => state.checkIsLocationInStore);
  const addFavoriteLocation = useFavoritesStore((state) => state.addFavoriteLocation);
  const removeFavoriteLocation = useFavoritesStore((state) => state.removeFavoriteLocation);
  const _favorites = useFavoritesStore((state) => state.favorites);

  function toggleIsLocationInFavorites() {
    if (!forecast) return;
    const isLocationInStore = checkIsLocationInStore(locationId);
    if (isLocationInStore) {
      removeFavoriteLocation(locationId);
    } else {
      const favoriteLocation: FavoriteLocation = {
        name: forecast.location.name,
        region: forecast.location.region,
        country: forecast.location.country,
      };
      addFavoriteLocation(locationId, favoriteLocation);
    }
  }

  return (
    <button
      onClick={(event) => {
        toggleIsLocationInFavorites();
        onClick?.(event);
      }}
      {...props}
      type="button"
    >
      {checkIsLocationInStore(locationId)
        ? <StarIcon width={50} height={50} />
        : <StarConturIcon width={50} height={50} />}
    </button>
  );
}

export default FavoritesButton;
