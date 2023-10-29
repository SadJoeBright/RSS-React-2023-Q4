import { Component, ReactNode } from 'react';

export default class Input extends Component {
  render(): ReactNode {
    return (
      <div>
        <input type="text" placeholder="Enter your name" />
      </div>
    );
  }
}
