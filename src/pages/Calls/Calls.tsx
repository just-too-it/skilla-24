import { useEffect, useMemo } from 'react';
import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/store';
import { getCalls } from '../../store/action-creators/calls';
import { CallsTable } from '../../components';

export const Calls = () => {
  const calls = useAppSelector((state: RootState) => state.calls.data);
  const dispatch = useAppDispatch();

  const { params } = useAppSelector((state) => state.calls);

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
      <CallsTable calls={calls} />
    </main>
  );
};
