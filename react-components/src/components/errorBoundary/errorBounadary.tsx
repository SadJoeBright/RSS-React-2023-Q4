import { Component, ErrorInfo, ReactNode } from 'react';

export default class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log(error, errorInfo);
  }

  render(): ReactNode {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <>
          <h3 className="error-message">Oops! Something went wrong!</h3>
          <button
            type="button"
            className="error-button"
            onClick={() => this.setState({ hasError: false })}
          >
            Go back
          </button>
        </>
      );
    }
    return children;
  }
}
