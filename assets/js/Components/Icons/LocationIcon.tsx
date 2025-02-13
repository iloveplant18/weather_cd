import { SVGAttributes } from "react";

function LocationIcon(
  { width = 24, height = 24, viewBox = "0 0 24 24", ...props }: SVGAttributes<any>,
) {
  return (
    <svg width={width} height={height} viewBox={viewBox} {...props}>
      <path
        d="M15 2C10.0307 2 6 5.91875 6 10.75C6 17.3125 15 27 15 27C15 27 24 17.3125 24 10.75C24 5.91875 19.9693 2 15 2ZM15 13.875C13.2257 13.875 11.7857 12.475 11.7857 10.75C11.7857 9.025 13.2257 7.625 15 7.625C16.7743 7.625 18.2143 9.025 18.2143 10.75C18.2143 12.475 16.7743 13.875 15 13.875Z"
        fill="white"
      />
    </svg>
  );
}

export default LocationIcon;
