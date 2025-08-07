import { useState } from 'react';

export const usePagination = (initialPage = 1, pageSize = 5) => {
  const [page, setPage] = useState(initialPage);
  const [pageSizeState, setPageSizeState] = useState(pageSize);

  const paginate = <T,>(data: T[]): T[] => {
    const start = (page - 1) * pageSizeState;
    return data.slice(start, start + pageSizeState);
  };

  return {
    page,
    setPage,
    pageSize: pageSizeState,
    setPageSize: setPageSizeState,
    paginate,
  };
};