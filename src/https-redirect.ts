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

/**
 * Check if https need to redirect and do the redirect
 *
 * @returns false if redirect is triggered. True otherwise
 */
export function httpsRedirect(): boolean {
  if (needRedirect(window)) {
    window.location.href = window.location.href.replace(/^http(?!s)/, "https");
    return false;
  }
  return true;
}
