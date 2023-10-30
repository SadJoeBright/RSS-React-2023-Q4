import { Component, ReactNode } from 'react';
import './App.css';
import Input from './components/input';
import Results from './components/results/results';

export default class App extends Component {
  render(): ReactNode {
    return (
      <div>
        <Input />
        <Results />
      </div>
    );
  }
}
