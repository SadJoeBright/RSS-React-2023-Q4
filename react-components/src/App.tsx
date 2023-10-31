import { Component, ReactNode } from 'react';
import './App.css';
import Input from './components/input';
import Results from './components/results/results';
import ErrorBoundary from './components/errorBoundary/errorBounadary';
import ErrorButton from './components/errorBoundary/errorButton';

export default class App extends Component {
  state = {
    searchResponse: [],
  };

  public setSearchResponse = (response: object[]) => {
    this.setState({ searchResponse: response });
  };

  render(): ReactNode {
    return (
      <ErrorBoundary>
        <ErrorButton />
        <Input updateResults={this.setSearchResponse} />
        <Results results={this.state.searchResponse} />
      </ErrorBoundary>
    );
  }
}
