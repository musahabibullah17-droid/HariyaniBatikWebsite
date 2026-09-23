import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function AdminOrders() {
  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pesanan Pelanggan</h1>
          <p className="text-gray-500 mt-1">Daftar semua pesanan masuk dari pelanggan.</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 md:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID Pesanan / Tanggal
              </th>
              <th scope="col" className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pelanggan
              </th>
              <th scope="col" className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th scope="col" className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="relative px-4 py-3 md:px-6">
                <span className="sr-only">Aksi</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {(!orders || orders.length === 0) ? (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                  Belum ada pesanan masuk.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-brand-primary">{order.order_number}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{new Date(order.created_at).toLocaleDateString('id-ID')}</div>
                    
                    {/* Mobile only info */}
                    <div className="md:hidden mt-2 flex flex-col gap-1">
                      <div className="text-xs text-gray-900 font-medium">{order.customer_name} <span className="text-gray-500 font-normal">({order.customer_phone})</span></div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs font-bold text-gray-900">
                          {new Intl.NumberFormat('id-ID', { style: 'currency', currency: order.currency || 'IDR', minimumFractionDigits: 0 }).format(order.total_amount)}
                        </span>
                        <span className={`px-1.5 py-0.5 inline-flex text-[10px] leading-4 font-semibold rounded-full ${
                          order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                          order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.customer_name}</div>
                    <div className="text-sm text-gray-500">{order.customer_phone}</div>
                  </td>
                  <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">
                      {new Intl.NumberFormat('id-ID', { style: 'currency', currency: order.currency || 'IDR', minimumFractionDigits: 0 }).format(order.total_amount)}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{order.payment_method || '-'}</div>
                  </td>
                  <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                      order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href={`/admin/orders/${order.id}`} className="text-indigo-600 hover:text-indigo-900">
                      Detail
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
