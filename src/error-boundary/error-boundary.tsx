import * as React from "react";
import { WithTranslation, withTranslation } from "react-i18next";
import { Ouch } from "./ouch";

interface IErrorBoundaryProps extends WithTranslation {
  children: React.ReactNode;
}

interface IErrorBoundaryState {
  error: Error | null;
}

export class ErrorBoundaryImpl extends React.Component<IErrorBoundaryProps> {
  public state: IErrorBoundaryState = {
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
