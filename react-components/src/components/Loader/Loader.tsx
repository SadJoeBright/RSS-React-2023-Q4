import { Circles } from 'react-loader-spinner';
import styles from './loader.module.css';

export default function Loader() {
  return (
    <Circles
      height="50"
      width="50"
      color="rgb(155, 155, 155)"
      ariaLabel="circles-loading"
      wrapperStyle={{}}
      wrapperClass={styles.loader}
      visible
    />
  );
}
