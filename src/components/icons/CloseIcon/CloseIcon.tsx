import { FC } from 'react';

import { IconProps } from '../types';

export const CloseIcon: FC<IconProps> = ({ fill }) => {
  return (
    <svg
      width="14.000000"
      height="14.000000"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs />
      <path
        id="Vector"
        d="M14 1.4L12.59 0L7 5.59L1.4 0L0 1.4L5.59 7L0 12.59L1.4 14L7 8.4L12.59 14L14 12.59L8.4 7L14 1.4Z"
        fill={fill}
        fillOpacity="1.000000"
        fillRule="nonzero"
      />
    </svg>
  );
};
