import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { setParams } from '../../../../store/entities/calls/callsSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { getRandomRating } from '../../../../utils/getRandomRating';
import { Call } from '../../types';

import { CallRow } from './CallRow';
import styles from './styles.module.scss';

interface CallsTableProps {
  calls: Array<Call>;
}

export const CallsTable = ({ calls }: CallsTableProps) => {
  const dispatch = useAppDispatch();
  const [callsWithRating, setCallsWithRating] = useState<Array<Call>>([]);
  const { params } = useAppSelector((state) => state.calls);

  useEffect(() => {
    setCallsWithRating(
      calls.map((call) => ({
        ...call,
        estimation: getRandomRating(),
      }))
    );
  }, []);

  const handleSortBy = (type: 'date' | 'duration') => {
    const newOrder =
      params.sortBy === type && params.order === 'ASC' ? 'DESC' : 'ASC';

    dispatch(
      setParams({
        ...params,
        sortBy: type,
        order: newOrder,
      })
    );
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.rowHead}>
          <th className={styles.cell}>Тип</th>
          <th
            className={clsx(styles.cell, styles.cellHover)}
            onClick={() => handleSortBy('date')}
          >
            Время
            <span
              className={clsx(styles.sortIndicator, {
                [styles.arrowAsc]:
                  params.sortBy === 'date' && params.order === 'ASC',
                [styles.arrowDesc]:
                  params.sortBy === 'date' && params.order === 'DESC',
              })}
            ></span>
          </th>
          <th className={styles.cell}>Сотрудник</th>
          <th className={styles.cell}>Звонок</th>
          <th className={styles.cell}>Источник</th>
          <th className={styles.cell}>Оценка</th>
          <th
            className={clsx(styles.cell, styles.cellHover)}
            onClick={() => handleSortBy('duration')}
          >
            Длительность
            <span
              className={clsx(styles.sortIndicator, {
                [styles.arrowAsc]:
                  params.sortBy === 'duration' && params.order === 'ASC',
                [styles.arrowDesc]:
                  params.sortBy === 'duration' && params.order === 'DESC',
              })}
            ></span>
          </th>
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
