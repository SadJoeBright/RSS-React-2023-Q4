import { Component, ReactNode } from 'react';
import Item from '../item/item';
import './results.css';
import { IResults } from '../../types/types';

export default class Results extends Component<IResults> {
  render(): ReactNode {
    const { results } = this.props;

    return (
      <section className="results">
        {results.length > 0 ? (
          results.map((el) => (
            <Item
              key={el.name}
              name={el.name}
              model={el.model}
              starship_class={el.starship_class}
              max_atmosphering_speed={el.max_atmosphering_speed}
              length={el.length}
              manufacturer={el.manufacturer}
              cost_in_credits={el.cost_in_credits}
            />
          ))
        ) : (
          <p>No results</p>
        )}
      </section>
    );
  }
}
