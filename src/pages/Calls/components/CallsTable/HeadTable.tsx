import clsx from 'clsx';

import { setParams } from '../../../../store/entities/calls/callsSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';

import styles from './styles.module.scss';

const HeadTable = () => {
  const dispatch = useAppDispatch();
  const { params } = useAppSelector((state) => state.calls);
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
  );
};

export default HeadTable;
