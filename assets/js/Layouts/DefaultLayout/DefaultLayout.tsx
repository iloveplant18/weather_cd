import { ReactNode } from "react";
import { Outlet } from "react-router";
import BottomNavigation from "./partials/BottomNavigation.tsx";

function DefaultLayout(): ReactNode {
  return (
    <div className="bg-[url('/images/variants/11.jpg')] bg-cover bg-fixed bg-no-repeat">
      <div className="h-dvh grid grid-rows-[1fr_auto] gap-y-5 backdrop-brightness-65 text-base">
        <div className="h-full max-h-full overflow-x-auto">
          <Outlet />
        </div>
        <BottomNavigation />
      </div>
    </div>
  );
}

export default DefaultLayout;
