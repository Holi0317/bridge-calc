export function pad(num: number | string, size: number): string {
  const s = "000000000" + num;
  return s.substr(s.length - size);
}
