import clsx from 'clsx';
import { Call } from '../../service/types';
import { getTimeFromDate, getTimeFromSeconds } from '../../utils';
import { Avatar } from '../Avatar';
import { CallArrowIcon } from '../icons';
import styles from './styles.module.scss';

export const CallRow = ({ call }: { call: Call }) => (
  <tr key={call.id} className={styles.rowCall}>
    <td className={styles.cell}>
      {call.in_out === 1 ? (
        <CallArrowIcon fill="#002CFB" />
      ) : (
        <CallArrowIcon fill="#28A879" className={styles.callArrow} />
      )}
    </td>
    <td className={styles.cell}>{getTimeFromDate(call.date)}</td>
    <td className={styles.cell}>
      <Avatar src={call.person_avatar} alt={call.person_name} />
    </td>
    <td className={styles.cell}>{call.from_number}</td>
    <td className={styles.cell}>{call.source}</td>
    <td className={styles.cell}>???</td>
    <td className={clsx(styles.cell, styles.time)}>
      {getTimeFromSeconds(call.time)}
    </td>
    <td className={clsx(styles.cell, styles.player)}>
      <audio
        controls
        src={undefined}
      />
    </td>
  </tr>
);
