import { Component, ReactNode } from 'react';
import './App.css';
import Input from './components/input/input';
import Results from './components/results/results';
import ErrorBoundary from './components/errorBoundary/errorBounadary';
import ErrorButton from './components/errorBoundary/errorButton';
import { IResults } from './types/types';

export default class App extends Component {
  state = {
    results: [],
  };

  public updateResults = (results: IResults): void => {
    this.setState({ results });
  };

  render(): ReactNode {
    return (
      <ErrorBoundary>
        <ErrorButton />
        <Input updateResults={this.updateResults} />
        <Results results={this.state.results} />
      </ErrorBoundary>
    );
  }
}
