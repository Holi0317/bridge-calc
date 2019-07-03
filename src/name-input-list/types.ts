export interface INameInputEntry {
  /**
   * Unique identifier for this entry.
   *
   * This is similar to key in React. This should be unique in the list given.
   */
  id: string;

  /**
   * Value of the entry to be shown in the input field.
   */
  value: string;

  /**
   * Error (if any) for the entry.
   *
   * If this is null, that means the entry does not have any validation issue.
   */
  error: string | null;
}

export interface INameInputListProps {
  /**
   * Values of data to be filled.
   */
  values: INameInputEntry[];
  /**
   * When data is changed (modified, renamed, deleted), this will be called with new data array.
   */
  onChange(values: INameInputEntry[]): void;
}
