import { FormEventHandler, KeyboardEvent, useEffect, useState } from "react";
import { DeviceType } from "../Types/types.ts";
import defineDeviceTypeService from "../Services/defineDeviceTypeService.ts";

type SearchProps = {
  onInput: FormEventHandler;
  resultAction: (dataInstance: any) => void;
  id: string;
  data: null | any[];
  error: string | null | undefined;
  canActivateByKeyboardShortcut?: boolean;
};

const deviceType: DeviceType = defineDeviceTypeService();

function Search(
  {
    onInput,
    resultAction,
    id,
    data,
    error,
    canActivateByKeyboardShortcut = false,
  }: SearchProps,
) {
  const [isSearchResultsShown, setIsSearchResultsShown] = useState<boolean>(false);

  useEffect(() => {
    if (!canActivateByKeyboardShortcut || deviceType === DeviceType.Mobile) {
      return;
    }
    document.addEventListener("keydown", function (event) {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        document.getElementById(id)?.focus();
      }
    });
  }, []);

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
    }
    if (event.key === "ArrowDown") {
      activateNextResult();
    } else if (event.key === "ArrowUp") {
      activatePrevResult();
    } else if (event.key === "Enter") {
      callResultActionOnActiveResult();
    }
  }

  function activateNextResult() {
    const activeResult = findActiveResult();
    if (activeResult) moveDown(activeResult);
    else activateFirstResult();
  }

  function activatePrevResult() {
    const activeResult = findActiveResult();
    if (activeResult) moveUp(activeResult);
    else activateFirstResult();
  }

  function findActiveResult(): HTMLElement | null {
    return document.querySelector(".search-result.active");
  }

  function moveDown(activeResult: Element) {
    activeResult.classList.remove("active");
    if (!activeResult.nextElementSibling) {
      activateFirstResult();
      return;
    }
    activeResult.nextElementSibling.classList.add("active");
  }

  function moveUp(activeResult: Element) {
    activeResult.classList.remove("active");
    if (!activeResult.previousElementSibling) {
      activateLastResult(activeResult);
      return;
    }
    activeResult.previousElementSibling.classList.add("active");
  }

  function activateLastResult(activeResult: Element) {
    activeResult.parentElement?.lastElementChild?.classList.add("active");
  }

  function activateFirstResult() {
    const firstResult = document.querySelector(".search-result");
    firstResult?.classList.add("active");
  }

  function callResultActionOnActiveResult() {
    const activeResult = findActiveResult();
    if (!activeResult) return;
    const activeResultIndex = Number(activeResult.dataset.index as string);
    const dataInstanceForActiveResult = data?.[activeResultIndex];
    if (dataInstanceForActiveResult) resultAction(dataInstanceForActiveResult);
  }

  return (
    <search className="relative">
      <input
        className="glass-block py-2 px-4 w-full input input-primary text-2xl focus:outline-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-base"
        id={id}
        type="text"
        onInput={onInput}
        onFocus={() => setIsSearchResultsShown(true)}
        onBlur={() => setIsSearchResultsShown(false)}
        placeholder={canActivateByKeyboardShortcut && deviceType === DeviceType.Desktop
          ? "Ctrl + K to search..."
          : "Search..."}
        onKeyDown={handleKeyDown}
      />
      <ul
        className={`absolute top-full w-full flex flex-col items-stretch shadow-xl text-lg font-bold ${
          !isSearchResultsShown && "hidden"
        }`}
      >
        {data
          ? (
            data.map((dataInstance, index) => (
              <li
                className="search-result relative z-20 w-full glass-block not-last:rounded-none not-last:shadow-none last:rounded-t-none hover:scale-105 transition-all [&.active]:scale-105"
                key={index}
                data-index={index}
              >
                <div
                  className="px-6 py-3 h-fit text-ellipsis"
                  onMouseDown={() => resultAction(dataInstance)}
                >
                  {`${dataInstance.name}, ${dataInstance.region}, ${dataInstance.country}`}
                </div>
              </li>
            ))
          )
          : error && (
            <div className="glass-block rounded-t-none py-3 px-6 font-bold">
              Something goes wrong... Check your internet connection and try again
            </div>
          )}
      </ul>
    </search>
  );
}

export default Search;
