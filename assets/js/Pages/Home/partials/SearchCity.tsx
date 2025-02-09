import { FormEvent, useEffect, useState } from "react";
import { Location } from "../../../Types/types.ts";
import { useNavigate } from "react-router";
import WeatherRepository from "../../../Repositories/WeatherRepository.ts";
import Search from "../../../Components/Search.tsx";

const weatherRepository = new WeatherRepository();

function SearchCity() {
  const [inputValue, setInputValue] = useState<string | null>(null);
  const [locations, setLocations] = useState<Location[] | null>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!inputValue) return;
    setLocations(null);
    setError(null);
    const getData = async () => {
      try {
        const locations = await weatherRepository.getMatchingLocations(
          inputValue,
        );
        setLocations(locations);
      } catch (error) {
        if (typeof error === "string") {
          setError(error);
        } else if (error instanceof Error) {
          setError(error.message);
        }
      }
    };
    getData();
  }, [inputValue]);

  function onInput(event: FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    setInputValue(target.value);
  }

  function navigateToLocationPage(location: Location) {
    navigate(`location/${location.id}`);
  }

  return (
    <Search
      onInput={onInput}
      resultAction={navigateToLocationPage}
      id="search-city"
      data={locations}
      error={error}
      canActivateByKeyboardShortcut={true}
    />
  );
}

export default SearchCity;
