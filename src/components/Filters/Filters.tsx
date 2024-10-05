import { CallTypes } from './CallTypes';
import styles from './styles.module.scss';

export const Filters = () => {
  return (
    <section className={styles.filters}>
      <CallTypes />
    </section>
  );
};
