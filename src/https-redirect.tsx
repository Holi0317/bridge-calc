import React from "react";
import { useEffect } from "react";

function isLocalHost(hostname: string) {
  return !!(
    hostname === "localhost" ||
    hostname === "[::1]" ||
    hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
  );
}

function needRedirect(win: Window) {
  return (
    win != null &&
    win.location != null &&
    win.location.protocol === "http:" &&
    !isLocalHost(win.location.hostname)
  );
}

interface Props {
  children: React.ReactNode;
}

export function HttpsRedirect(props: Props) {
  const redir = needRedirect(window);
  useEffect(() => {
    if (redir) {
      window.location.href = window.location.href.replace(
        /^http(?!s)/,
        "https"
      );
    }
  }, [redir]);

  if (redir) {
    return null;
  }
  return <>{props.children}</>;
}
