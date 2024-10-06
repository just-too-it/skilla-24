import { FC } from 'react';

import { IconProps } from '../types';

export const CalendarIcon: FC<IconProps> = ({ fill }) => {
  return (
    <svg
      width="16.000000"
      height="17.599976"
      viewBox="0 0 16 17.6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs />
      <path
        id="Vector"
        d="M14.39 1.59L13.6 1.59L13.6 0L12 0L12 1.59L4 1.59L4 0L2.39 0L2.39 1.59L1.6 1.59C0.71 1.59 0 2.32 0 3.2L0 16C0 16.87 0.71 17.6 1.6 17.6L14.39 17.6C15.28 17.6 16 16.87 16 16L16 3.2C16 2.32 15.28 1.59 14.39 1.59ZM14.39 16L1.6 16L1.6 5.59L14.39 5.59L14.39 16Z"
        fill={fill}
        fillOpacity="1.000000"
        fillRule="nonzero"
      />
    </svg>
  );
};
