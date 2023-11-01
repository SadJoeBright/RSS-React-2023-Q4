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
}
