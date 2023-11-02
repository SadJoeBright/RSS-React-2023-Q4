import Item from '../item/item';
import './results.css';
import { IItem } from '../../types/types';

interface ResultsProps {
  results: IItem[];
}

export default function Results({ results }: ResultsProps) {
  return (
    <section className="results">
      {results.length ? (
        results.map((item) => (
          <Item
            key={item.name}
            name={item.name}
            model={item.model}
            starship_class={item.starship_class}
            max_atmosphering_speed={item.max_atmosphering_speed}
            length={item.length}
            manufacturer={item.manufacturer}
            cost_in_credits={item.cost_in_credits}
          />
        ))
      ) : (
        <p>No results</p>
      )}
    </section>
  );
}
