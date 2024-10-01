import { Call } from '../../service/types';
import styles from './styles.module.scss';
import { CallRow } from './CallRow';

interface CallsTableProps {
  calls: Array<Call>;
}

export const CallsTable = ({ calls }: CallsTableProps) => {
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
        {calls.length > 0 ? (
          calls.map((call) => <CallRow key={call.id} call={call} />)
        ) : (
          <tr className={styles.NotFound}>
            <td colSpan={7}>Звонки не найдены</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
