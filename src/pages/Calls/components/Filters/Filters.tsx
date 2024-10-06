import { CallTypes } from './CallTypes';
import { CustomDatePicker } from './DatePicker/DatePicker';
import styles from './styles.module.scss';

export const Filters = () => {
  return (
    <section className={styles.filters}>
      <CallTypes />
      <CustomDatePicker />
    </section>
  );
};
