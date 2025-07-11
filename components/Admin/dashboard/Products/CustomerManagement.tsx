"use client"

import { CustomerManagementHeader } from "./CustomerManagementHeader/CustomerManagementHeader"
import { FilterBar } from "./CustomerManagementHeader/FilterBar"
import StatisticsGrid from "./CustomerManagementHeader/StatisticsGrid"
import Table from "./Table"
import { Pagination } from "./CustomerManagementHeader/Pagination"
import { useState } from "react"

type PaginationData = {
  current_page: number
  total_pages: number
  total_products: number
  per_page: number
  next_page_url: string | null
  prev_page_url: string | null
}

export const CustomerManagement = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [paginationData, setPaginationData] = useState<PaginationData>({
    current_page: 1,
    total_pages: 1,
    total_products: 0,
    per_page: 10,
    next_page_url: null,
    prev_page_url: null,
  })

  const handlePaginationChange = (data: PaginationData) => {
    setPaginationData(data)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <main className="flex flex-col p-6 mx-auto max-w-none w-full mt-4 bg-white max-md:max-w-full max-sm:max-w-screen-sm">
      <CustomerManagementHeader />
      <FilterBar />
      <StatisticsGrid />
      <Table onPaginationChange={handlePaginationChange} currentPage={currentPage} />
      <Pagination
        currentPage={paginationData.current_page}
        totalPages={paginationData.total_pages}
        onPageChange={handlePageChange}
      />
    </main>
  )
}

export default CustomerManagement
