"use client";
import { CustomerManagementHeader } from "./CustomerManagementHeader/CustomerManagementHeader";
import { FilterBar } from "./CustomerManagementHeader/FilterBar";
import { StatisticsGrid } from "./CustomerManagementHeader/StatisticsGrid";
import  Table  from "./Table"
import { Pagination } from "./CustomerManagementHeader/Pagination";

export const CustomerManagement = () => {
  return (
    <main className="flex flex-col p-6 mx-auto max-w-none w-full mt-4 bg-white max-md:max-w-full max-sm:max-w-screen-sm">
      <CustomerManagementHeader />
      <FilterBar />
      <StatisticsGrid />
      <Table/>
      <Pagination />
    </main>
  );
};

export default CustomerManagement;
