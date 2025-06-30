"use client"

import { useGetOrdersQuery } from "@/lib/features/order/orderApi"


export default function AdminOrdersList() {

const { data, isLoading, isError } = useGetOrdersQuery()

if (isLoading) return <p>Loading orders...</p>
if (isError || !data) return <p>Failed to load orders.</p>

const orders = data?.data || [];


console.log("Orders data:", orders)

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">All Orders</h2>
      <div className="overflow-auto border rounded-lg">
        <table className="min-w-full table-auto text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Items</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Payment</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Delivery</th>
              <th className="px-4 py-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{order._id.slice(-6)}</td>
                <td className="px-4 py-2">{order.userId?.name} <br /> <span className="text-xs text-gray-500">{order.userId?.email}</span></td>
                <td className="px-4 py-2">
                  {order.items.map(item => (
                    <div key={item.id} className="text-xs">
                      {item.name} x {item.quantity}
                    </div>
                  ))}
                </td>
                <td className="px-4 py-2">৳{order.totalAmount}</td>
                <td className="px-4 py-2 capitalize">{order.paymentMethod}</td>
                <td className="px-4 py-2 capitalize">{order.orderStatus}</td>
                <td className="px-4 py-2">
                  {order.deliveryAddress?.area}<br />
                  <span className="text-xs text-gray-500">{order.deliveryAddress?.street}</span>
                </td>
                <td className="px-4 py-2 text-xs">{order.deliveryDate} 
                  <br />
                   
                   {order.deliveryTime}
                   
                   </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
