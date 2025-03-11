"use client";

import {
  Component,
  type ErrorInfo,
  type PropsWithChildren,
  type ReactNode,
} from "react";

export class ErrorBoundary extends Component<
  PropsWithChildren<{
    fallback?: ReactNode;
    onError?(error: Error): void;
  }>,
  {
    hasError: boolean;
  }
> {
  static displayName = "ErrorBoundary";

  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error, { componentStack }: ErrorInfo) {
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.error(error, componentStack);
    }

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
