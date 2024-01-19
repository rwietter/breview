import React from "react";

const Browser: React.FC = () => (
  // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    className="injected-svg"
    data-src="/icons/chrome-stroke-rounded.svg"
    role="img"
    color="#000000"
  >
    <circle cx="12" cy="12" r="10" stroke="#000000" stroke-width="1" />
    <circle cx="12" cy="12" r="4" stroke="#000000" stroke-width="1" />
    <path d="M8.53448 14L4.0332 6" stroke="#000000" stroke-width="1" stroke-linecap="round" />
    <path d="M11.5 21.5L15.5 14" stroke="#000000" stroke-width="1" stroke-linecap="round" />
    <path d="M12 8H21" stroke="#000000" stroke-width="1" stroke-linecap="round" />
  </svg>
);

export default Browser;
