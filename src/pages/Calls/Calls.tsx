import { useEffect, useMemo } from 'react';

import { CallsTable, Loader } from '../../components';
import { Filters } from '../../components/';
import { getCalls } from '../../store/action-creators/calls';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/store';

import styles from './styles.module.scss';

export const Calls = () => {
  const { data, params, status } = useAppSelector(
    (state: RootState) => state.calls
  );
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
      {status === 'loading' && <Loader />}
      <Filters />
      {status === 'success' && <CallsTable calls={data} />}
    </main>
  );
};
