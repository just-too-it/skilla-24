import { useEffect, useState } from 'react';

import { Call } from '../../pages/Calls/types';
import { getRandomRating } from '../../utils/getRandomRating';

import { CallRow } from './CallRow';
import styles from './styles.module.scss';

interface CallsTableProps {
  calls: Array<Call>;
}

export const CallsTable = ({ calls }: CallsTableProps) => {
  const [callsWithRating, setCallsWithRating] = useState<Array<Call>>([]);

  useEffect(() => {
    setCallsWithRating(
      calls.map((call) => ({
        ...call,
        estimation: getRandomRating(),
      }))
    );
  }, []);

  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.rowHead}>
          <th className={styles.cell}>Тип</th>
          <th className={styles.cell}>Время</th>
          <th className={styles.cell}>Сотрудник</th>
          <th className={styles.cell}>Звонок</th>
          <th className={styles.cell}>Источник</th>
          <th className={styles.cell}>Оценка</th>
          <th className={styles.cell}>Длительность</th>
        </tr>
      </thead>

      <tbody className={styles.body}>
        {callsWithRating.length > 0 ? (
          callsWithRating.map((call) => <CallRow key={call.id} call={call} />)
        ) : (
          <tr className={styles.NotFound}>
            <td colSpan={7}>Звонки не найдены</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
