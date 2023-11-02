import { IItem } from '../../types/types';
import './item.css';

export default function Item(props: IItem) {
  const {
    name,
    model,
    starship_class,
    max_atmosphering_speed,
    length,
    manufacturer,
    cost_in_credits,
  } = props;

  return (
    <div className="item">
      <h2>{name}</h2>
      <h3>Model: {model}</h3>
      <h3>Class: {starship_class}</h3>
      <ul className="item__props-list">
        <li className="item__prop">Speed: {max_atmosphering_speed}</li>
        <li className="item__prop">Length: {length}</li>
        <li className="item__prop">Manufactured by: {manufacturer}</li>
        <li className="item__prop">Cost: {cost_in_credits}</li>
      </ul>
    </div>
  );
}
