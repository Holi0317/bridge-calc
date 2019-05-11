import { pad } from "./pad";

const globalCount = Object.keys(window).length;
const mimeTypesLength = navigator.mimeTypes ? navigator.mimeTypes.length : 0;
const clientId = pad(
  (mimeTypesLength + navigator.userAgent.length).toString(36) +
    globalCount.toString(36),
  4
);

export function fingerprint() {
  return clientId;
}
