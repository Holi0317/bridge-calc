export function stripTrailingSlash(basename: string): string {
  if (basename !== "/" && basename.substr(-1) === "/") {
    return basename.substr(0, basename.length - 1);
  }
  return basename;
}

export function stripHostname(basename: string): string {
  return new URL(basename).pathname;
}

export function basenameProcess(basename: string): string {
  return stripHostname(stripTrailingSlash(basename));
}
