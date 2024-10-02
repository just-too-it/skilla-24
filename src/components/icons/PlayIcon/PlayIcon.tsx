import { FC } from 'react';

import { IconProps } from '../types';

export const PlayIcon: FC<IconProps> = ({ fill }) => {
  return (
    <svg
      width="8.000000"
      height="10.000000"
      viewBox="0 0 8 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs />
      <path
        id="Vector"
        d="M0.28 0.06C0.37 0.02 0.47 0 0.57 0C0.67 0 0.77 0.02 0.86 0.06L7.71 4.55C7.89 4.64 8 4.81 8 5C8 5.18 7.89 5.35 7.71 5.44L0.86 9.93C0.68 10.02 0.46 10.02 0.28 9.93C0.1 9.83 0 9.66 0 9.48L0 0.51C0 0.33 0.1 0.16 0.28 0.06Z"
        fill={fill}
        fill-opacity="1.000000"
        fill-rule="nonzero"
      />
    </svg>
  );
};
