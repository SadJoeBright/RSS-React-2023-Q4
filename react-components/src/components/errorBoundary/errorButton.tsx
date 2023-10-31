import { Component, ReactNode } from 'react';

export default class ErrorBut extends Component {
  state = { hasError: false };

  throwError = () => {
    this.setState({ hasError: true });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      throw new Error('Generated Error');
    }
    return (
      <button
        type="button"
        className="error-generator"
        onClick={this.throwError}
      >
        Throw Error
      </button>
    );
  }
}
