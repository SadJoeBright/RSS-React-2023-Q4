import { Component, ReactNode } from 'react';
import './App.css';
import Input from './components/input';

export default class App extends Component {
  render(): ReactNode {
    return (
      <div>
        <Input />
      </div>
    );
  }
}
