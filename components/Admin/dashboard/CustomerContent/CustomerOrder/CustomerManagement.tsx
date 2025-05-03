"use client";
import Content  from "./CustomerOd/Content";
import { Header } from "./CustomerOd/Header"

import  Table  from "./Table"
import { Pagination } from "./CustomerOd/Pagination";

export const CustomerManagement = () => {
  return (
    <main className="flex flex-col p-6 mx-auto max-w-none w-full mt-4 bg-white max-md:max-w-full max-sm:max-w-screen-sm">
      <Content />
      <Header/>
     
      
      
      <Table/>

      <Pagination />
    </main>
  );
};

export default CustomerManagement;
