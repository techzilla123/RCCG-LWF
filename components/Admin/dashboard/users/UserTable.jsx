import React from 'react';
import UserTableHeader from './UserTableHeader';
import UserTableRow from './UserTableRow';

const userData = [
  {
    id: '14E4201200ER',
    name: 'John Doe',
    email: 'johndoe@email.com',
    phone: '0801234567',
    lastTransaction: { type: 'BEDC', date: 'Tue, 07-10-2024, 13:15' },
    totalTransactions: 400,
    status: 'Active',
  },
  {
    id: '14E4201200ER',
    name: 'John Doe',
    email: 'johndoe@email.com',
    phone: '0801234567',
    lastTransaction: { type: 'NHIS', date: 'Tue, 07-10-2024, 13:15' },
    totalTransactions: 20,
    status: 'Regular',
  },
  {
    id: '14E4201200ER',
    name: 'John Doe',
    email: 'johndoe@email.com',
    phone: '0801234567',
    lastTransaction: { type: 'Insurance', date: 'Tue, 07-10-2024, 13:15' },
    totalTransactions: 5,
    status: 'Inactive',
  },
  {
    id: '14E4201200ER',
    name: 'John Doe',
    email: 'johndoe@email.com',
    phone: '0801234567',
    lastTransaction: { type: 'Loan', date: 'Tue, 07-10-2024, 13:15' },
    totalTransactions: 1,
    status: 'First Time',
  },
];

function UserTable() {
  return (
    <div className="flex flex-col flex-1 mt-4 w-full rounded-xl max-md:max-w-full">
      <UserTableHeader />
      {userData.map((user, index) => (
        <UserTableRow key={index} {...user} />
      ))}
    </div>
  );
}

export default UserTable;