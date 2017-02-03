/**
 * A service class providing necessary information for layout.
 *
 * These information includes title to be shown on layout title
 * and should layout show back button.
 */
export class LayoutService {
  public title?: string;

  constructor() {
    this.title = '';
  }
}
