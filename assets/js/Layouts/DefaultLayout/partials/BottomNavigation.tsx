import { ReactNode } from "react";
import HomeIcon from "../../../Components/Icons/HomeIcon.tsx";
import { NavLink } from "react-router";
import StarIcon from "../../../Components/Icons/StarIcon.tsx";
import SettingsIcon from "../../../Components/Icons/SettingsIcon.tsx";

type LinkType = {
  text: string;
  to: string;
  icon: ReactNode;
};

const links: LinkType[] = [
  {
    text: "Home",
    to: "",
    icon: <HomeIcon className="w-7 h-7 sm:w-9 sm:h-9" width={36} height={36} />,
  },
  {
    text: "Favorites",
    to: "favorites",
    icon: <StarIcon className="w-7 h-7 sm:w-9 sm:h-9" width={36} height={36} />,
  },
  {
    text: "Settings",
    to: "settings",
    icon: <SettingsIcon className="w-7 h-7 sm:w-9 sm:h-9" width={36} height={36} />,
  },
];

function BottomNavigation() {
  return (
    <nav className="pb-2 container">
      <ul className="flex glass-block backdrop-blur-2xl">
        {links.map((link) => (
          <li
            className="flex-1 pb-3 pt-5 has-[.active]:bg-base-200 transition-all"
            key={link.text}
          >
            <NavLink
              className={({ isActive }) =>
                `flex flex-col font-bold focus:outline-0 focus-visible:scale-120 items-center transition-all ${
                  isActive ? " text-base scale-120" : "text-base/80"
                }`}
              to={link.to}
            >
              {link.icon}
              <span>
                {link.text}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default BottomNavigation;
