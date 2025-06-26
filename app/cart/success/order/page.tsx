"use client"

import { useState, useEffect } from "react"
import Offer from "@/components/Offer"
import TopNavBar from "@/components/TopNavBar"
import Footer from "@/components/Footer"

// Types based on the API response
interface OrderItem {
  id: number
  orderId: string
  orderDate: string
  orderStatus: string
  amount: string
  noOfItem: number
  deliveryDate: string | null
  customerName: string
}

interface GroupedOrder {
  orderId: string
  orderDate: string
  orderStatus: string
  customerName: string
  totalAmount: number
  totalItems: number
  deliveryDate: string | null
  items: OrderItem[]
}

export default function ProfessionalOrderManagement() {
  const [orders, setOrders] = useState<OrderItem[]>([])
  const [groupedOrders, setGroupedOrders] = useState<GroupedOrder[]>([])
  const [selectedOrder, setSelectedOrder] = useState<GroupedOrder | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDetailLoading, setIsDetailLoading] = useState(false)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedIndividualOrder, setSelectedIndividualOrder] = useState<any>(null)
  const [isIndividualLoading, setIsIndividualLoading] = useState(false)

  // API helper function
  const getApiHeaders = () => {
    const token = localStorage.getItem("accessToken") || ""
    return {
      "Content-Type": "application/json",
      "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
      ...(token && { Authorization: token }),
    }
  }

  // Fetch all orders
  const fetchOrders = async () => {
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}customer/order-list`, {
        method: "GET",
        headers: getApiHeaders(),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch orders")
      }

      const data = await response.json()
      setOrders(data.data || [])
      groupOrdersByOrderId(data.data || [])
    } catch (error) {
      setError("Failed to load orders. Please try again.")
      console.error("Error fetching orders:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Group orders by orderId
  const groupOrdersByOrderId = (orderData: OrderItem[]) => {
    const grouped = orderData.reduce((acc: { [key: string]: GroupedOrder }, item) => {
      if (!acc[item.orderId]) {
        acc[item.orderId] = {
          orderId: item.orderId,
          orderDate: item.orderDate,
          orderStatus: item.orderStatus,
          customerName: item.customerName,
          totalAmount: 0,
          totalItems: 0,
          deliveryDate: item.deliveryDate,
          items: [],
        }
      }

      acc[item.orderId].totalAmount += Number.parseFloat(item.amount)
      acc[item.orderId].totalItems += item.noOfItem
      acc[item.orderId].items.push(item)

      return acc
    }, {})

    const groupedArray = Object.values(grouped).sort(
      (a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime(),
    )

    setGroupedOrders(groupedArray)
  }

  // Fetch order details by orderId
  const fetchOrderDetails = async (orderId: string) => {
    setIsDetailLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/fetch-order-by-order-id/${orderId}`,
        {
          method: "GET",
          headers: getApiHeaders(),
        },
      )

      if (!response.ok) {
        throw new Error("Failed to fetch order details")
      }

      const data = await response.json()
      const orderItems = data.data || []
      if (orderItems.length > 0) {
        const groupedDetail = {
          orderId: orderId,
          orderDate: orderItems[0].orderDate,
          orderStatus: orderItems[0].orderStatus,
          customerName: orderItems[0].customerName,
          totalAmount: orderItems.reduce((sum: number, item: OrderItem) => sum + Number.parseFloat(item.amount), 0),
          totalItems: orderItems.reduce((sum: number, item: OrderItem) => sum + item.noOfItem, 0),
          deliveryDate: orderItems[0].deliveryDate,
          items: orderItems,
        }
        setSelectedOrder(groupedDetail)
      }
    } catch (error) {
      console.error("Error fetching order details:", error)
    } finally {
      setIsDetailLoading(false)
    }
  }

  // Filter orders based on search and status
  const filteredOrders = groupedOrders.filter((order) => {
    const matchesSearch =
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.orderStatus === statusFilter
    return matchesSearch && matchesStatus
  })

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Get status color
  const getStatusColor = (status: string) => {
    if (!status) return "bg-gray-50 text-gray-700 border-gray-200"

    switch (status.toLowerCase()) {
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200"
      case "completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200"
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200"
      case "processing":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "shipped":
        return "bg-purple-50 text-purple-700 border-purple-200"
      case "approved":
        return "bg-green-50 text-green-700 border-green-200"
      case "in-progress":
        return "bg-orange-50 text-orange-700 border-orange-200"
      case "delivered":
        return "bg-teal-50 text-teal-700 border-teal-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const fetchIndividualOrderDetails = async (id: number, orderId: string) => {
    setIsIndividualLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}customer/fetch-order/${id}/${orderId}`, {
        method: "GET",
        headers: getApiHeaders(),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch individual order details")
      }

      const data = await response.json()
      setSelectedIndividualOrder(data.data)
    } catch (error) {
      console.error("Error fetching individual order details:", error)
    } finally {
      setIsIndividualLoading(false)
    }
  }

  const printReceipt = () => {
    if (!selectedOrder) return

    const printWindow = window.open("", "_blank", "width=800,height=600")
    if (!printWindow) return

    const receiptHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Receipt - Order #${selectedOrder.orderId}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: Arial, sans-serif; 
          margin: 20px; 
          line-height: 1.4;
          color: #333;
        }
        .header { 
          text-align: center; 
          border-bottom: 2px solid #000; 
          padding-bottom: 15px; 
          margin-bottom: 25px; 
        }
        .header h1 { 
          font-size: 24px; 
          margin-bottom: 10px; 
        }
        .order-info { 
          margin-bottom: 25px; 
          background: #f9f9f9;
          padding: 15px;
          border-radius: 5px;
        }
        .order-info p { 
          margin-bottom: 8px; 
        }
        .items-table { 
          width: 100%; 
          border-collapse: collapse; 
          margin-bottom: 25px; 
        }
        .items-table th, .items-table td { 
          border: 1px solid #ddd; 
          padding: 12px 8px; 
          text-align: left; 
        }
        .items-table th { 
          background-color: #f2f2f2; 
          font-weight: bold;
        }
        .items-table tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        .total { 
          font-weight: bold; 
          font-size: 18px; 
          text-align: right; 
          background: #f0f0f0;
          padding: 15px;
          border-radius: 5px;
        }
        .total p {
          margin-bottom: 5px;
        }
        @media print { 
          body { margin: 10px; }
          .header { page-break-after: avoid; }
          .items-table { page-break-inside: avoid; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>ORDER RECEIPT</h1>
        <p>Order #${selectedOrder.orderId}</p>
        <p>Generated on ${new Date().toLocaleDateString()}</p>
      </div>
      <div class="order-info">
        <p><strong>Customer:</strong> ${selectedOrder.customerName}</p>
        <p><strong>Order Date:</strong> ${formatDate(selectedOrder.orderDate)}</p>
        <p><strong>Status:</strong> ${(selectedOrder.orderStatus || "Unknown").toUpperCase()}</p>
        ${selectedOrder.deliveryDate ? `<p><strong>Delivery Date:</strong> ${formatDate(selectedOrder.deliveryDate)}</p>` : ""}
      </div>
      <table class="items-table">
        <thead>
          <tr>
            <th>Item ID</th>
            <th>Quantity</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${selectedOrder.items
            .map(
              (item) => `
            <tr>
              <td>#${item.id}</td>
              <td>${item.noOfItem}</td>
              <td>${formatCurrency(Number.parseFloat(item.amount))}</td>
              <td>${(item.orderStatus || "Unknown").toUpperCase()}</td>
            </tr>
          `,
            )
            .join("")}
        </tbody>
      </table>
      <div class="total">
        <p>Total Items: ${selectedOrder.totalItems}</p>
        <p>Total Amount: ${formatCurrency(selectedOrder.totalAmount)}</p>
      </div>
      <script>
        window.onload = function() {
          window.print();
        }
      </script>
    </body>
    </html>
  `

    printWindow.document.write(receiptHTML)
    printWindow.document.close()
  }

  // Load orders on component mount
  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: calc(200px + 100%) 0;
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out;
        }

        .animate-slideInRight {
          animation: slideInRight 0.4s ease-out;
        }

        .shimmer {
          background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
          background-size: 200px 100%;
          animation: shimmer 1.5s infinite;
        }

        .card-hover {
          transition: all 0.2s ease;
        }

        .card-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px -8px rgba(0, 0, 0, 0.1);
        }

        .order-card {
          background: white;
          border: 1px solid #e2e8f0;
          transition: all 0.2s ease;
        }

        .order-card:hover {
          border-color: #cbd5e1;
          box-shadow: 0 4px 12px -4px rgba(0, 0, 0, 0.1);
        }
      `}</style>

      <div className="min-h-screen bg-gray-50">
        {/* Header Components */}
        <Offer />
        <TopNavBar />

        {/* Main Header */}
        <div className="bg-white border-b border-gray-200 py-8">
          <div className="max-w-7xl mx-auto px-6">
            <div className="animate-fadeInUp">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Management</h1>
              <p className="text-gray-600">Track and manage your orders efficiently</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-8">
            {/* Orders List */}
            <div className="xl:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-fadeInUp">
                {/* Search and Filter */}
                <div className="mb-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">Orders</h2>
                    <span className="text-sm text-gray-500">{filteredOrders.length} orders found</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Search by Order ID or Customer Name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="in-progress">In Progress</option>
                      <option value="approved">Approved</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                {/* Orders Grid */}
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="order-card rounded-lg p-4">
                        <div className="animate-pulse">
                          <div className="flex justify-between items-start mb-3">
                            <div className="shimmer h-5 w-32 rounded"></div>
                            <div className="shimmer h-5 w-20 rounded-full"></div>
                          </div>
                          <div className="space-y-2">
                            <div className="shimmer h-4 w-48 rounded"></div>
                            <div className="shimmer h-4 w-36 rounded"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : error ? (
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-4xl mb-4">⚠</div>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                      onClick={fetchOrders}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Retry
                    </button>
                  </div>
                ) : filteredOrders.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-300 text-4xl mb-4">📦</div>
                    <p className="text-gray-600">No orders found</p>
                    <p className="text-gray-500 text-sm">Try adjusting your search or filter criteria</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredOrders.map((order, index) => (
                      <div
                        key={order.orderId}
                        className="order-card rounded-lg p-4 cursor-pointer card-hover"
                        style={{ animationDelay: `${index * 0.05}s` }}
                        onClick={() => {
                          setSelectedOrder(order)
                          fetchOrderDetails(order.orderId)
                        }}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">#{order.orderId}</h3>
                            <p className="text-gray-600 text-sm">{order.customerName}</p>
                          </div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                              order.orderStatus,
                            )}`}
                          >
                            {order.orderStatus
                              ? order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)
                              : "Unknown"}
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Amount</p>
                            <p className="font-semibold text-green-600">{formatCurrency(order.totalAmount)}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Items</p>
                            <p className="font-medium">{order.totalItems}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Date</p>
                            <p className="font-medium">{formatDate(order.orderDate).split(",")[0]}</p>
                          </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500">{order.items.length} line items</span>
                            <span className="text-blue-600 font-medium">View Details →</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Order Details */}
            <div className="xl:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6 animate-slideInRight xl:sticky xl:top-8">
                {selectedOrder ? (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-semibold text-gray-900">Order Details</h2>
                      <button
                        onClick={() => setSelectedOrder(null)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        ✕
                      </button>
                    </div>

                    {isDetailLoading ? (
                      <div className="space-y-4">
                        <div className="animate-pulse">
                          <div className="shimmer h-6 w-full rounded mb-4"></div>
                          <div className="shimmer h-4 w-3/4 rounded mb-2"></div>
                          <div className="shimmer h-4 w-1/2 rounded mb-4"></div>
                          <div className="space-y-2">
                            {[...Array(3)].map((_, i) => (
                              <div key={i} className="shimmer h-12 w-full rounded"></div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {/* Order Summary */}
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="text-center">
                            <h3 className="text-xl font-bold text-gray-900 mb-1">#{selectedOrder.orderId}</h3>
                            <p className="text-gray-600 mb-3">{selectedOrder.customerName}</p>
                            <div
                              className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                                selectedOrder.orderStatus,
                              )}`}
                            >
                              {selectedOrder.orderStatus
                                ? selectedOrder.orderStatus.charAt(0).toUpperCase() + selectedOrder.orderStatus.slice(1)
                                : "Unknown"}
                            </div>
                          </div>
                        </div>

                        {/* Order Info */}
                        <div className="space-y-3">
                          <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-gray-600">Total Amount</span>
                            <span className="font-bold text-lg text-green-600">
                              {formatCurrency(selectedOrder.totalAmount)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-gray-600">Total Items</span>
                            <span className="font-semibold">{selectedOrder.totalItems}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-gray-600">Order Date</span>
                            <span className="font-medium">{formatDate(selectedOrder.orderDate)}</span>
                          </div>
                          {selectedOrder.deliveryDate && (
                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                              <span className="text-gray-600">Delivery Date</span>
                              <span className="font-medium">{formatDate(selectedOrder.deliveryDate)}</span>
                            </div>
                          )}
                        </div>

                        {/* Order Items */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">
                            Order Items ({selectedOrder.items.length})
                          </h4>
                          <div className="space-y-2 max-h-64 overflow-y-auto">
                            {selectedOrder.items.map((item, index) => (
                              <div
                                key={item.id}
                                className="bg-gray-50 rounded-lg p-3 border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors"
                                style={{ animationDelay: `${index * 0.05}s` }}
                                onClick={() => fetchIndividualOrderDetails(item.id, item.orderId)}
                              >
                                <div className="flex justify-between items-start">
                                  <div className="flex-1">
                                    <p className="font-medium text-gray-900">Item #{item.id}</p>
                                    <p className="text-sm text-gray-600">Qty: {item.noOfItem}</p>
                                    <span
                                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium border mt-1 ${getStatusColor(item.orderStatus)}`}
                                    >
                                      {item.orderStatus.charAt(0).toUpperCase() + item.orderStatus.slice(1)}
                                    </span>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-semibold text-green-600">
                                      {formatCurrency(Number.parseFloat(item.amount))}
                                    </p>
                                    <p className="text-xs text-blue-600 mt-1">Click for details →</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-4 border-t border-gray-100">
                          <button
                            onClick={printReceipt}
                            className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                          >
                            Print Receipt
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-gray-300 text-4xl mb-4">📋</div>
                    <p className="text-gray-500 mb-2">Select an order</p>
                    <p className="text-gray-400 text-sm">Click on any order to view details</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Individual Order Details Modal */}
        {selectedIndividualOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Item Details</h3>
                  <button
                    onClick={() => setSelectedIndividualOrder(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                {isIndividualLoading ? (
                  <div className="animate-pulse space-y-4">
                    <div className="shimmer h-4 w-full rounded"></div>
                    <div className="shimmer h-4 w-3/4 rounded"></div>
                    <div className="shimmer h-4 w-1/2 rounded"></div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="space-y-2">
                        <p>
                          <span className="font-medium">Item ID:</span> #{selectedIndividualOrder.id}
                        </p>
                        <p>
                          <span className="font-medium">Order ID:</span> #{selectedIndividualOrder.orderId}
                        </p>
                        <p>
                          <span className="font-medium">Quantity:</span> {selectedIndividualOrder.quantity}
                        </p>
                        <p>
                          <span className="font-medium">Amount:</span>{" "}
                          {formatCurrency(Number.parseFloat(selectedIndividualOrder.amount))}
                        </p>
                        <p>
                          <span className="font-medium">Status:</span>
                          <span
                            className={`ml-2 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedIndividualOrder.status)}`}
                          >
                            {selectedIndividualOrder.status
                              ? selectedIndividualOrder.status.charAt(0).toUpperCase() +
                                selectedIndividualOrder.status.slice(1)
                              : "Unknown"}
                          </span>
                        </p>
                        <p>
                          <span className="font-medium">Order Type:</span> {selectedIndividualOrder.orderType || "N/A"}
                        </p>
                        <p>
                          <span className="font-medium">Delivery Address:</span>{" "}
                          {selectedIndividualOrder.deliveryAddress || "N/A"}
                        </p>
                        {selectedIndividualOrder.size && (
                          <p>
                            <span className="font-medium">Size:</span> {selectedIndividualOrder.size}
                          </p>
                        )}
                        {selectedIndividualOrder.color && (
                          <p>
                            <span className="font-medium">Color:</span> {selectedIndividualOrder.color}
                          </p>
                        )}
                        {selectedIndividualOrder.deliveryDate && (
                          <p>
                            <span className="font-medium">Delivery Date:</span>{" "}
                            {formatDate(selectedIndividualOrder.deliveryDate)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </>
  )
}
