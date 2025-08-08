"use client"
import { CustomerManagementHeader } from "./CustomerManagementHeader/CustomerManagementHeader"
import { FilterBar } from "./CustomerManagementHeader/FilterBar"
import StatisticsGrid from "./CustomerManagementHeader/StatisticsGrid"
import {Table} from "./Table"
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
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedFilterCategoryId, setSelectedFilterCategoryId] = useState<string | null>(null); // Renamed for clarity

  // New state for sort/category filter
  const [sortFilterType, setSortFilterType] = useState<'GCT' | 'PCT' | 'SCT' | null>(null);
  const [sortFilterId, setSortFilterId] = useState<string | null>(null);

  const handleFilterByCategory = (categoryId: string | null) => {
    setSelectedFilterCategoryId(categoryId);
    setSortFilterType(null); // Clear sort filter when main category filter changes
    setSortFilterId(null);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleSortFilter = (type: 'GCT' | 'PCT' | 'SCT' | null, id: string | null, name: string) => {
    setSortFilterType(type);
    setSortFilterId(id);
    setSelectedFilterCategoryId(null); // Clear main category filter when sort filter changes
    setCurrentPage(1); // Reset to first page when filter changes
  };

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
      <FilterBar
        onFilterByCategory={handleFilterByCategory}
        onSearch={setSearchTerm}
        onSortFilter={handleSortFilter} // Pass new sort filter handler
      />
      <StatisticsGrid />
      <Table
        onPaginationChange={handlePaginationChange}
        currentPage={currentPage}
        selectedFilterCategoryId={selectedFilterCategoryId}
        searchTerm={searchTerm}
        sortFilterType={sortFilterType} // Pass new sort filter type
        sortFilterId={sortFilterId} // Pass new sort filter ID
      />
      <Pagination
        currentPage={paginationData.current_page}
        totalPages={paginationData.total_pages}
        onPageChange={handlePageChange}
      />
    </main>
  )
}

export default CustomerManagement
