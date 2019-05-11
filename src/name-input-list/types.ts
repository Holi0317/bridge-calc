export type Setter<DataType> = (newVal: string, oldVal: DataType) => DataType;
export type Getter<DataType> = (data: DataType) => string;
export type ErrorGetter<DataType, ErrorType> = (
  error: ErrorType,
  value: DataType,
  index: number
) => string | null;

export interface INameInputListProps<DataType, ErrorType> {
  /**
   * Values of data to be filled.
   */
  values: DataType[];
  /**
   * Optional. Error to be displayed under name input.
   */
  error: ErrorType;
  /**
   * Get error from given data.
   * If returned is empty string or null, that implies no error exist.
   */
  errorGetter: ErrorGetter<DataType, ErrorType>;
  /**
   * Getter to transform data into string displayed in input field.
   */
  getter: Getter<DataType>;
  /**
   * This function transform old data to new one with given new value in input field.
   */
  setter: Setter<DataType>;
  /**
   * When data is changed (modified, renamed, deleted), this will be called with new data array.
   */
  onChange(values: DataType[]): void;
}
