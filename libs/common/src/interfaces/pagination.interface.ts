export interface Pagination<T> {
  data: T[],
  pagination: {
    page: number,
    totalItems: number,
    totalPages: number,
    itemsPerPage: number,
  },
}
