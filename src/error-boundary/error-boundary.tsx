import React from "react";
import { Ouch } from "./ouch";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  public state: ErrorBoundaryState = {
    error: null
  };

  public componentDidCatch(err: Error) {
    console.error(err);
    this.setState(() => ({
      error: err
    }));
  }

  public render() {
    const { error } = this.state;
    if (error) {
      return <Ouch error={error} />;
    }
    return this.props.children;
  }
}
