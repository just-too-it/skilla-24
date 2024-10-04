import React, { useState, useRef, useEffect } from 'react';

import { getTimeFromSeconds } from '../../utils';
import { downloadFile } from '../../utils/downloadFile';
import { CloseIcon, DownloadIcon, PauseIcon, PlayIcon } from '../icons';

import styles from './styles.module.scss';

interface AudioPlayerProps {
  src: string;
  onClose: () => void;
}

export const AudioPlayer = ({ src, onClose }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const seekTime = (Number(e.target.value) / 100) * duration;
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.addEventListener('timeupdate', onTimeUpdate);
      audioElement.addEventListener('loadedmetadata', onLoadedMetadata);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener('timeupdate', onTimeUpdate);
        audioElement.removeEventListener('loadedmetadata', onLoadedMetadata);
      }
    };
  }, []);

  return (
    <article className={styles.audioPlayer}>
      <audio
        src={src}
        ref={audioRef}
        preload="metadata"
        onLoadedMetadata={onLoadedMetadata}
      />
      <div className={styles.time}>
        {getTimeFromSeconds(Math.floor(duration))}
      </div>
      <button className={styles.playButton} onClick={handlePlay}>
        {isPlaying ? <PauseIcon fill="#002CFB" /> : <PlayIcon fill="#002CFB" />}
      </button>

      <input
        className={styles.seekBar}
        type="range"
        min="0"
        max="100"
        value={duration > 0 ? (currentTime / duration) * 100 : 0}
        onChange={handleSeek}
      />
      <button
        className={styles.downloadButton}
        onClick={() => downloadFile(src)}
      >
        <DownloadIcon />
      </button>
      <button className={styles.closeButton} onClick={onClose}>
        <CloseIcon />
      </button>
    </article>
  );
};
