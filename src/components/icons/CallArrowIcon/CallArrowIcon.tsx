import { FC } from 'react';

import { IconProps } from './types';

export const CallArrowIcon: FC<IconProps> = ({ fill, className }) => {
  return (
    <svg
      width="12.521744"
      height="12.521729"
      viewBox="0 0 12.5217 12.5217"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={className}
    >
      <defs />
      <path
        id="Vector"
        d="M12.52 1.17L11.34 0L1.66 9.67L1.66 4.17L0 4.17L0 12.52L8.34 12.52L8.34 10.85L2.84 10.85L12.52 1.17Z"
        fill={fill}
        fillOpacity="1.000000"
        fillRule="nonzero"
      />
    </svg>
  );
};
