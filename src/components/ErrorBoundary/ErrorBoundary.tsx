import { Component, ErrorInfo, PropsWithChildren, ReactElement } from "react";

export type ErrorBoundaryProps = PropsWithChildren<{
  fallback?: ReactElement;
  onError?(error: Error): void;
}>;

export type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error, { componentStack }: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error(error, componentStack);

    this.props.onError?.(error);
  }

  render() {
    const { children, fallback } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return fallback;
    }

    return children;
  }
}
