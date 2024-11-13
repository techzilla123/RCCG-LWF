import React from 'react';
import UserTableHeader from './UserTableHeader';
import UserTableRow from './UserTableRow';

const userData = [
  {
    id: '14E4201200ER1',
    name: 'John Doe',
    email: 'johndoe@email.com',
    phone: '0801234567',
    lastTransaction: { type: 'BEDC', date: 'Tue, 07-10-2024, 13:15' },
    totalTransactions: 400,
    status: 'Active',
  },
  {
    id: '14E4201200ER2',
    name: 'Jane Smith',
    email: 'janesmith@email.com',
    phone: '0809876543',
    lastTransaction: { type: 'NHIS', date: 'Tue, 07-10-2024, 13:15' },
    totalTransactions: 20,
    status: 'Regular',
  },
  {
    id: '14E4201200ER3',
    name: 'Alice Johnson',
    email: 'alicejohnson@email.com',
    phone: '0805432198',
    lastTransaction: { type: 'Insurance', date: 'Tue, 07-10-2024, 13:15' },
    totalTransactions: 5,
    status: 'Inactive',
  },
  {
    id: '14E4201200ER4',
    name: 'Bob Brown',
    email: 'bobbrown@email.com',
    phone: '0803216549',
    lastTransaction: { type: 'Loan', date: 'Tue, 07-10-2024, 13:15' },
    totalTransactions: 1,
    status: 'First Time',
  },
];

function UserTable({ searchQuery }) {
  const filteredData = userData.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col flex-1 mt-4 w-full rounded-xl max-md:max-w-full">
      <UserTableHeader />
      {filteredData.length > 0 ? (
        filteredData.map((user) => <UserTableRow key={user.id} {...user} />)
      ) : (
        <div className="flex justify-center p-4">No users found</div>
      )}
    </div>
  );
}

export default UserTable;
