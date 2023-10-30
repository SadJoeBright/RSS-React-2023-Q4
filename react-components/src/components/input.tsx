import { Component, ReactNode } from 'react';

export default class Input extends Component {
  // eslint-disable-next-line class-methods-use-this
  async getData() {
    const response = await fetch('https://swapi.dev/api/starships/?search=');
    const data = await response.json();
    // const { results } = data;
    // eslint-disable-next-line no-console
    console.log(data);
    // return results;
  }

  render(): ReactNode {
    return (
      <div>
        <input type="text" placeholder="Enter your name" />
        <button type="submit" onClick={this.getData}>
          Search
        </button>
      </div>
    );
  }
}
