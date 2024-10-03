import { useEffect, useMemo } from 'react';
import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/store';
import { getCalls } from '../../store/action-creators/calls';
import { CallsTable, Loader } from '../../components';

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
    }),
    [params]
  );

  useEffect(() => {
    dispatch(getCalls(callsData));
  }, [callsData, dispatch]);

  return (
    <main className={styles.calls}>
      {status === 'loading' && <Loader />}
      {status === 'success' && <CallsTable calls={data} />}
    </main>
  );
};
