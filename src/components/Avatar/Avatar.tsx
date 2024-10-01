import styles from './styles.module.scss';

interface AvatarProps {
  src: string;
  alt: string;
  size?: number;
}

export const Avatar = ({ src, alt, size = 32 }: AvatarProps) => {
  return (
    <img
      src={src}
      alt={alt}
      className={styles.avatar}
      width={size}
      height={size}
    />
  );
};
