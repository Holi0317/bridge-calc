import * as React from "react";
import { WithTranslation, withTranslation } from "react-i18next";
import { Ouch } from "./ouch";

interface ErrorBoundaryProps extends WithTranslation {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

export class ErrorBoundaryImpl extends React.Component<ErrorBoundaryProps> {
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

export const ErrorBoundary = withTranslation()(ErrorBoundaryImpl);
