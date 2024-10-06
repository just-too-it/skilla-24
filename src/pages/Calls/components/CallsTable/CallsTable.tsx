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
    setCallsWithRating(
      calls.map((call) => ({
        ...call,
        estimation: getRandomRating(),
      }))
    );
  }, [calls]);

  return (
    <table className={styles.table}>
      <HeadTable />
      {status === 'loading' && (
        <div className={styles.loaderData}>
          <Loader />
        </div>
      )}
      {status === 'success' && (
        <tbody className={styles.body}>
          {callsWithRating.length > 0 ? (
            callsWithRating.map((call) => <CallRow key={call.id} call={call} />)
          ) : (
            <tr className={styles.NotFound}>
              <td colSpan={7}>Звонки не найдены</td>
            </tr>
          )}
        </tbody>
      )}
    </table>
  );
};
