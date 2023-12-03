import { useSelector } from 'react-redux';
import { IFormData } from '../../store/formDataSlice';
import { RootState } from '../../store/store';
import './Tiles.css';

export default function Tiles() {
  const formData = useSelector((state: RootState) => state.formData.formData);

  return (
    <div className="tiles-container">
      {formData &&
        formData
          .slice()
          .reverse()
          .map((item: IFormData) => (
            <div key={item.email} className="tile">
              <div className="tile-content">
                <p>
                  <b>Name:</b> {item.name}
                </p>
                <p>
                  <b>Age:</b> {item.age}
                </p>
                <p>
                  <b>E-mail:</b> {item.email}
                </p>
                <p>
                  <b>Password:</b> {item.password}
                </p>
                <p>
                  <b>Country:</b> {item.country}
                </p>
                <p>
                  <b>Gender:</b> {item.gender}
                </p>
              </div>
              <img src={item.image} alt={item.image} />
            </div>
          ))}
    </div>
  );
}
