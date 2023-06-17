import { ImgHTMLAttributes } from 'react';
import styles from './styles.module.css';

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  hasBorder?: boolean;
}

export function Avatar({ alt, hasBorder = true, ...props }: AvatarProps) {
  return <img className={hasBorder ? styles.avatarWithBorder : styles.avatar} alt={alt} {...props} />;
}
