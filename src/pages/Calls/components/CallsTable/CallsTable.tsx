import { useEffect, useState } from 'react';

import { Loader } from '../../../../components';
import { useAppSelector } from '../../../../store/hooks';
import { getRandomRating } from '../../../../utils/getRandomRating';
import { Call } from '../../types';

import { CallRow } from './CallRow';
import HeadTable from './HeadTable';
import styles from './styles.module.scss';

interface CallsTableProps {
  calls: Array<Call>;
}

export const CallsTable = ({ calls }: CallsTableProps) => {
  const { status } = useAppSelector((state) => state.calls);
  const [callsWithRating, setCallsWithRating] = useState<Array<Call>>([]);

  useEffect(() => {
    if (status === 'success') {
      setCallsWithRating(
        calls.map((call) => ({
          ...call,
          estimation: getRandomRating(),
        }))
      );
    }
  }, [calls, status]);

  return (
    <table className={styles.table}>
      <HeadTable />
      <tbody className={styles.body}>
        {status === 'loading' && (
          <tr className={styles.loaderData}>
            <td colSpan={7}>
              <Loader />
            </td>
          </tr>
        )}
        {status === 'success' && callsWithRating.length > 0
          ? callsWithRating.map((call) => <CallRow key={call.id} call={call} />)
          : status === 'success' && (
              <tr className={styles.NotFound}>
                <td colSpan={7}>Звонки не найдены</td>
              </tr>
            )}
      </tbody>
    </table>
  );
};
