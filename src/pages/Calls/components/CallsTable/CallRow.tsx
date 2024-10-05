import clsx from 'clsx';
import { useState } from 'react';

import {
  Avatar,
  RatingBadge,
  Loader,
  AudioPlayer,
} from '../../../../components';
import { CallArrowIcon } from '../../../../components/icons';
import { getAudioRecord } from '../../../../store/action-creators/calls';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { getTimeFromDate, getTimeFromSeconds } from '../../../../utils';
import { Call } from '../../types';

import styles from './styles.module.scss';

export const CallRow = ({ call }: { call: Call }) => {
  const dispatch = useAppDispatch();
  const { audioRecords, statusAudio } = useAppSelector((state) => state.calls);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlayerClosed, setIsPlayerClosed] = useState(false);

  const handleRowHover = (recordId: string, partnershipId: string) => {
    setIsHovered(true);

    if (isPlayerClosed && audioRecords[recordId]) {
      return;
    }

    if (!recordId) return;

    if (!audioRecords[recordId]) {
      dispatch(getAudioRecord({ record: recordId, partnershipId }));
    }

    setIsPlayerClosed(false);
  };

  const handleRowLeave = () => {
    setIsHovered(false);
  };

  const handleClosePlayer = () => {
    setIsPlayerClosed(true);
  };

  const audioUrl = audioRecords[call.record];

  return (
    <tr
      key={call.id}
      className={styles.rowCall}
      onMouseEnter={() => handleRowHover(call.record, call.partnership_id)}
      onMouseLeave={handleRowLeave}
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
      <td className={styles.cell}>
        <RatingBadge type={call.estimation} />
      </td>
      <td className={clsx(styles.cell, styles.time)}>
        {getTimeFromSeconds(call.time)}
      </td>
      <td className={styles.cell}>
        <div
          className={clsx({
            [styles.player]:
              isHovered &&
              !isPlayerClosed &&
              (audioUrl || statusAudio === 'loading'),
            [styles.playerHidden]: !isHovered || isPlayerClosed,
          })}
        >
          {isHovered && statusAudio === 'loading' && !isPlayerClosed && (
            <div className={styles.loader}>
              <Loader />
            </div>
          )}
          {audioUrl &&
            statusAudio === 'success' &&
            isHovered &&
            !isPlayerClosed && (
              <AudioPlayer src={audioUrl} onClose={handleClosePlayer} />
            )}
        </div>
      </td>
    </tr>
  );
};
