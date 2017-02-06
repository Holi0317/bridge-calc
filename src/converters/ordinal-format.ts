export class OrdinalFormatValueConverter {
  toView(value: string) {
    let suffix = ["th","st","nd","rd"];
    let v = +value % 100;
    return value + (suffix[(v-20)%10]||suffix[v]||suffix[0]);
  }
}
