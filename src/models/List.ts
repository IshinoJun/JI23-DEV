export interface List<T> {
  contents: T[];
  offset: number;
  limit: number;
  totalCount: number;
}
