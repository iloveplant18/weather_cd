import StarIcon from "../../../Components/Icons/StarIcon.tsx";
import StarConturIcon from "../../../Components/Icons/StarConturIcon.tsx";
import { ButtonHTMLAttributes } from "react";
import useFavoritesStore from "../../../Stores/FavoritesStore.ts";
import { FavoriteLocation } from "../../../Types/types.ts";

type Props = ButtonHTMLAttributes<any> & {
  favoriteId: number;
  favorite: FavoriteLocation;
};

function ToggleFavoritesButton({ favoriteId, favorite, type, ...props }: Props) {
  const checkIsLocationInStore = useFavoritesStore((state) => state.checkIsLocationInStore);
  const addFavoriteLocation = useFavoritesStore((state) => state.addFavoriteLocation);
  const removeFavoriteLocation = useFavoritesStore((state) => state.removeFavoriteLocation);

  function toggleIsLocationFavorite() {
    if (checkIsLocationInStore(favoriteId)) {
      removeFavoriteLocation(Number(favoriteId));
    } else {
      addFavoriteLocation(favoriteId, favorite);
    }
  }

  return (
    <button
      onClick={toggleIsLocationFavorite}
      type={type ?? "button"}
      {...props}
    >
      {checkIsLocationInStore(favoriteId)
        ? <StarIcon width={40} height={40} />
        : <StarConturIcon width={40} height={40} />}
    </button>
  );
}

export default ToggleFavoritesButton;
