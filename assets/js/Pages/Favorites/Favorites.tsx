import useFavoritesStore from "../../Stores/FavoritesStore.ts";
import ToggleFavoritesButton from "./partials/ToggleFavoritesButton.tsx";
import { useState } from "react";
import { Link } from "react-router";

function Favorites() {
  const favorites = useFavoritesStore((state) => state.favorites);
  const [favoritesFrozenCopy] = useState(structuredClone(favorites));

  return (
    <section className="container pt-5">
      <ul className="space-y-1">
        {Object.entries(favoritesFrozenCopy).length === 0
          ? (
            <div className="text-2xl font-bold">
              No favorites at the moment
            </div>
          )
          : Object.entries(favoritesFrozenCopy).map(([favoriteId, favorite]) => (
            <li
              className="relative glass-block py-3 px-4 flex justify-between items-center md:text-2xl"
              key={favoriteId}
            >
              <Link className="before:absolute before:inset-0" to={`/location/${favoriteId}`}>
                <span className="font-bold">{favorite.name},</span>
                {` ${favorite.region && `${favorite.region},`}
              ${favorite.country}`}
              </Link>
              <ToggleFavoritesButton className="relative" favoriteId={Number(favoriteId)} favorite={favorite} />
            </li>
          ))}
      </ul>
    </section>
  );
}

export default Favorites;
