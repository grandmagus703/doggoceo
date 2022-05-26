import { useState } from "react"

export const usePagination = () => {
  // Pagination Hook
  const [pagination, setPagination] = useState({ current: 0, total: 0, itemsPerPage: 10 })

  const isLastPage = () => {
    // Check if current page is the last page
    return Math.floor(pagination.total / pagination.itemsPerPage) === pagination.current
  }

  // Navigation functions on pagination
  const gotoNextPage = () => { setPagination({...pagination, current: pagination.current + 1}) }
  const gotoPrevPage = () => { setPagination({...pagination, current: pagination.current - 1}) }

  return {
    pagination,
    setPagination,
    isLastPage,
    gotoNextPage,
    gotoPrevPage
  }
}
