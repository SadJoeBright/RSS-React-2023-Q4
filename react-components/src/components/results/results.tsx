import { Component, ReactNode } from 'react';
import Item from '../../item/item';
import './results.css';

export default class Resaults extends Component {
  render(): ReactNode {
    return (
      <section className="results">
        <Item
          name="New Ship"
          model="Model"
          starship_class="Starship Class"
          max_atmosphering_speed="Max Atmosphering Speed"
          length="150"
          manufacturer="Manufacturer"
          cost_in_credits="10000"
        />
      </section>
    );
  }
}
