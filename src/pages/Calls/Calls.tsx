import { useEffect, useMemo } from 'react';

import { getCalls } from '../../store/action-creators/calls';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/store';

import { CallsTable, Filters } from './components';
import styles from './styles.module.scss';

export const Calls = () => {
  const { data, params } = useAppSelector((state: RootState) => state.calls);
  const dispatch = useAppDispatch();

  const callsData = useMemo(
    () => ({
      callType: params.callType,
      dateStart: params.dateStart,
      dateEnd: params.dateEnd,
      ...(params.sortBy && { sortBy: params.sortBy }),
      ...(params.order && { order: params.order }),
    }),
    [params]
  );

  useEffect(() => {
    dispatch(getCalls(callsData));
  }, [callsData, dispatch]);

  return (
    <main className={styles.calls}>
      <Filters />
      <CallsTable calls={data} />
    </main>
  );
};
