import clsx from 'clsx';
import { Call } from '../../service/types';
import { getTimeFromDate, getTimeFromSeconds } from '../../utils';
import { Avatar } from '../Avatar';
import { CallArrowIcon } from '../icons';
import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEffect, useState } from 'react';
import { getAudioRecord } from '../../store/action-creators/calls';
import { AudioPlayer } from '../AudioPlayer/AudioPlayer';

export const CallRow = ({ call }: { call: Call }) => {
  const dispatch = useAppDispatch();
  const { audioRecords } = useAppSelector((state) => state.calls);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const handleRowHover = (recordId: string, partnershipId: string) => {
    if (!recordId) return;

    if (!audioRecords[recordId]) {
      dispatch(getAudioRecord({ record: recordId, partnershipId }));
    }

    setPlayingAudioId(audioRecords[recordId]);
  };

  useEffect(() => {
    return () => {
      if (playingAudioId) {
        URL.revokeObjectURL(playingAudioId);
      }
    };
  }, [playingAudioId]);

  return (
    <tr
      key={call.id}
      className={styles.rowCall}
      onMouseEnter={() => handleRowHover(call.record, call.partnership_id)}
    >
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
      {playingAudioId && (
        <td className={clsx(styles.cell, styles.player)}>
          <AudioPlayer src={playingAudioId} />
        </td>
      )}
    </tr>
  );
};
