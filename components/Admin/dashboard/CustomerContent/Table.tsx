"use client";
import React, { useState, useRef, useEffect } from "react";
import Actions from "./Dropdown/Actions";

const statusColors: Record<string, string> = {
  Active: "bg-green",
  Inactive: "bg-red-400",
};

type User = {
  customerId: string;
  firstname: string;
  lastname: string;
  email: string;
  location: string | null;
  status: "Active" | "Inactive" | string; // Extend if needed
  userType: string;
  registrationDate: string;
  orders?: number; // Optional, since it's not in your API
  image?: string;  // Optional, based on your fallback logic
};


const Table = () => {
const [users, setUsers] = useState<User[]>([]);
    const [loadingUserId, setLoadingUserId] = useState<string | null>(null);
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
  const [dropdownDirection, setDropdownDirection] = useState<"up" | "down">("down");
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("accessToken") || "";
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}admin/customer-list`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
              ...(token && { Authorization: token }),
            },
          }
        );
        const result = await response.json();
        if (result.statusCode === 200) {
          setUsers(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  const toggleDropdown = (index: number) => {
    if (openDropdownIndex === index) {
      setOpenDropdownIndex(null);
      return;
    }

    const rect = dropdownRefs.current[index]?.getBoundingClientRect();
    const spaceBelow = window.innerHeight - (rect?.bottom || 0);
    setDropdownDirection(spaceBelow < 100 ? "up" : "down");
    setOpenDropdownIndex(index);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        openDropdownIndex !== null &&
        dropdownRefs.current[openDropdownIndex] &&
        !dropdownRefs.current[openDropdownIndex]?.contains(e.target as Node)
      ) {
        setOpenDropdownIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdownIndex]);

  const handleStatusChange = async (userId: string, currentStatus: string) => {
    setLoadingUserId(userId);
    try {
      const token = localStorage.getItem("accessToken") || "";
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}admin/change-customer-status/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
            ...(token && { Authorization: token }),
          },
        }
      );

      if (response.ok) {
        setUsers(prev =>
          prev.map(user =>
            user.customerId === userId
              ? { ...user, status: currentStatus === "Active" ? "Inactive" : "Active" }
              : user
          )
        );
      }
    } catch (err) {
      console.error("Error updating status", err);
    } finally {
      setLoadingUserId(null);
      setOpenDropdownIndex(null);
    }
  };

  const handleDelete = async (userId: string) => {
    setLoadingUserId(userId);
    try {
      const token = localStorage.getItem("accessToken") || "";
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}admin/delete-customer/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
            ...(token && { Authorization: token }),
          },
        }
      );

      if (response.ok) {
        setUsers(prev => prev.filter(user => user.customerId !== userId));
      }
    } catch (err) {
      console.error("Error deleting user", err);
    } finally {
      setLoadingUserId(null);
      setOpenDropdownIndex(null);
    }
  };

  return (
    <div className="mt-6 relative">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 text-left font-medium">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Location</th>
            <th className="p-3">Date joined</th>
            <th className="p-3">Orders</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => {
            const fullName = `${user.firstname} ${user.lastname}`;
            const initials = `${user.firstname?.[0] || ""}${user.lastname?.[0] || ""}`;
            const isLoading = loadingUserId === user.customerId;

            return (
              <tr key={user.customerId} className="border-b">
                <td className="p-3 flex items-center gap-3">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={fullName}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold text-white">
                      {initials.toUpperCase()}
                    </div>
                  )}
                  <div>
                    <div className="font-medium">{fullName}</div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </div>
                </td>
                <td className="p-3">{user.location || "—"}</td>
                <td className="p-3">
                  {new Date(user.registrationDate).toLocaleDateString()}
                </td>
                <td className="p-3">{user.orders || 0}</td>
                <td className="p-3 flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        statusColors[user.status] || "bg-gray-400"
                      }`}
                    ></span>
                    {user.status}
                  </div>
                  <div
                    className="relative"
                    ref={((el: HTMLDivElement | null) => {
                      dropdownRefs.current[idx] = el;
                    }) as React.Ref<HTMLDivElement>}
                  >
                    <div
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => toggleDropdown(idx)}
                    >
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    </div>

                    {openDropdownIndex === idx && (
                      <div className="absolute right-0 z-50">
                      <Actions
  direction={dropdownDirection}
  isLoading={isLoading}
  onActivate={() =>
    handleStatusChange(user.customerId, user.status)
  }
  onDeactivate={() =>
    handleStatusChange(user.customerId, user.status)
  }
  onDelete={() => handleDelete(user.customerId)}
  currentStatus={user.status}
  customerId={user.customerId}
/>

                      </div>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
