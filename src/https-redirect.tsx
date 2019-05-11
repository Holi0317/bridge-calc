import * as React from "react";

function isLocalHost(hostname: string) {
  return !!(
    hostname === "localhost" ||
    hostname === "[::1]" ||
    hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
  );
}

export class HttpsRedirect extends React.Component {
  public constructor(props: any) {
    super(props);
    if (
      typeof window !== "undefined" &&
      window.location &&
      window.location.protocol === "http:" &&
      !isLocalHost(window.location.hostname)
    ) {
      window.location.href = window.location.href.replace(
        /^http(?!s)/,
        "https"
      );
    }
  }

  public render() {
    return this.props.children;
  }
}
