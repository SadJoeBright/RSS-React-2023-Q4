import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../store/store';
import { IFormData } from '../store/formDataSlice';

export default function MainPage() {
  const formData = useSelector((state: RootState) => state.formData.formData);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/uncontrolledForm">Uncontrolled Form</Link>
        </li>
        <li>
          <Link to="/reactHookForm">ReactHook Form</Link>
        </li>
      </ul>
      {formData &&
        formData.map((item: IFormData) => (
          <img key={item.image} src={item.image} alt="" />
        ))}
    </nav>
  );
}
