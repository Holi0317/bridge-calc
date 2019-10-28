/**
 * Cuid.js
 * Collision-resistant UID generator for browsers and node.
 * Sequential for fast db lookups and recency sorting.
 * Safe for element IDs and server-side lookups.
 *
 * Extracted from CLCTR
 *
 * Copyright (c) Eric Elliott 2012
 * MIT License
 *
 * Source: https://github.com/ericelliott/cuid
 * This is a ES Module port of cuid module.
 * cuid version: v2.1.1 (9258a81)
 */

import { fingerprint } from "./fingerprint";
import { pad } from "./pad";

let c = 0;
const blockSize = 4;
const base = 36;
const discreteValues = Math.pow(base, blockSize);

function randomBlock(): string {
  // Tslint:disable-next-line:no-bitwise
  return pad(((Math.random() * discreteValues) << 0).toString(base), blockSize);
}

function safeCounter(): number {
  c = c < discreteValues ? c : 0;
  c++;
  return c - 1;
}

export function cuid(): string {
  // Make cuid behave a simple counter in testing environment for easier snapshot testing.
  if (process.env.NODE_ENV === "test") {
    return "" + c++;
  }

  // Starting with a lowercase letter makes it HTML element ID friendly.
  const letter = "c";

  // Warning: this exposes the exact date and time that the uid was created.
  const timestamp = new Date().getTime().toString(base);

  // Prevent same-machine collisions.
  const counter = pad(safeCounter().toString(base), blockSize);

  /*
   * A few chars to generate distinct ids for different clients
   * (so different computers are far less likely to generate the same id)
   */
  const print = fingerprint();

  // Grab some more chars from Math.random()
  const random = randomBlock() + randomBlock();

  return letter + timestamp + counter + print + random;
}

export function slug(): string {
  const date = new Date().getTime().toString(36);
  const counter = safeCounter()
    .toString(36)
    .slice(-4);
  const print = fingerprint().slice(0, 1) + fingerprint().slice(-1);
  const random = randomBlock().slice(-2);

  return date.slice(-2) + counter + print + random;
}

export { fingerprint };
