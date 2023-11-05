import { Circles } from 'react-loader-spinner';

export default function Loader() {
  return (
    <Circles
      height="50"
      width="50"
      color="rgb(175, 228, 223)"
      ariaLabel="circles-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible
    />
  );
}
