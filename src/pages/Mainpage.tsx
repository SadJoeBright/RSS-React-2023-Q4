import { Link } from 'react-router-dom';
import Tile from '../components/Tiles/Tiles';

export default function MainPage() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/uncontrolledForm">Uncontrolled Form</Link>
          </li>
          <li>
            <Link to="/reactHookForm">ReactHook Form</Link>
          </li>
        </ul>
      </nav>
      <Tile />
    </>
  );
}
