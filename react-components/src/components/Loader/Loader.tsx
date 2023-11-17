import { Circles } from 'react-loader-spinner';
import './loader.css';

export default function Loader() {
  return (
    <Circles
      height="50"
      width="50"
      color="rgb(155, 155, 155)"
      ariaLabel="circles-loading"
      wrapperStyle={{}}
      wrapperClass="loader"
      visible
    />
  );
}
