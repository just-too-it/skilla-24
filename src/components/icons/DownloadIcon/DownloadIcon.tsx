import { FC } from 'react';

import { IconProps } from '../types';

export const DownloadIcon: FC<IconProps> = ({ fill }) => {
  return (
    <svg
      width="13.000000"
      height="16.000000"
      viewBox="0 0 13 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs />
      <path
        id="Vector"
        d="M0 16L13 16L13 14.11L0 14.11L0 16ZM13 5.64L9.28 5.64L9.28 0L3.71 0L3.71 5.64L0 5.64L6.5 12.23L13 5.64Z"
        fill={fill}
        fillOpacity="1.000000"
        fillRule="nonzero"
      />
    </svg>
  );
};
