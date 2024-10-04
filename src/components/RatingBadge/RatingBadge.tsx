import clsx from 'clsx';
import { Rating } from '../../pages/Calls/types';
import styles from './styles.module.scss';

interface RatingBadgeProps {
  type: Rating;
}

export const RatingBadge = ({ type }: RatingBadgeProps) => {
  let badgeClassName: string;

  switch (type) {
    case Rating.BAD:
      badgeClassName = 'bad';
      break;
    case Rating.GOOD:
      badgeClassName = 'good';
      break;
    case Rating.EXCELLENT:
      badgeClassName = 'excellent';
      break;
    default:
      badgeClassName = '';
  }

  return (
    <div
      className={clsx(styles.badge, badgeClassName && styles[badgeClassName])}
    >
      {type}
    </div>
  );
};
