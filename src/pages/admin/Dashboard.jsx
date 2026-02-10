import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Loader2, Search, RefreshCw, Eye } from 'lucide-react';
import SEO from '../../components/SEO';
import OrderDetail from './OrderDetail';
import Button from '../../components/Button';
const AdminDashboard = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  // AUTH CHECK
  useEffect(() => {
    const token = sessionStorage.getItem('howlite_admin_token');
    if (!token) navigate('/howlite/admin'); // Kick out if no token
  }, [navigate]);
  const handleLocalUpdate = (orderId, newStatus) => {
    setOrders(prev => prev.map(o =>
      o.id === orderId ? { ...o, status: newStatus } : o
    ));
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(prev => ({ ...prev, status: newStatus }));
    }
  };
  // DATA FETCHING
  const fetchOrders = async () => {
    const token = sessionStorage.getItem('howlite_admin_token');
    if (!token) return;

    const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

    setLoading(true);
    try {
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify({
          action: "getOrders",
          token: token
        }),
      });

      const data = await response.json();

      if (data.success) {
        setOrders(data.orders);
      } else {
        console.error("Fetch error:", data.message);
      }
    } catch (error) {
      console.error("Network error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // LOGOUT
  const handleLogout = () => {
    sessionStorage.removeItem('howlite_admin_token');
    navigate('/howlite/admin');
  };

  // FILTERING
  const filteredOrders = orders.filter(order =>
    order.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-obsidian text-bone font-sans">
      <SEO title="Atelier Dashboard" />

      {/* --- TOP BAR --- */}
      <header className="border-b border-white/10 bg-surface sticky top-0 z-20">
        <div className="container mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-xl font-serif italic">Howlite</span>
            <span className="text-[10px] uppercase tracking-widest bg-white/5 px-2 py-1 rounded text-ash">
              Admin
            </span>
          </div>

          <Button
            onClick={handleLogout}
            variant="ghost"
            size="sm"
            className="text-ash hover:text-red-400 gap-2 px-0"
          >
            Logout <LogOut size={14} />
          </Button>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="container mx-auto px-6 py-12">

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h1 className="text-3xl font-serif italic mb-2">Enquiries Log</h1>
            <p className="text-ash text-sm">Managing {orders.length} active threads</p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0">
              <input
                type="text"
                placeholder="Search ID or Name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-surface border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-bone focus:border-bronze outline-none w-full md:w-64"
              />
              <Search size={14} className="absolute left-4 top-3 text-ash" />
            </div>
            <Button
              onClick={fetchOrders}
              variant="ghost"
              size="sm"
              className="px-2"
              title="Refresh Data"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            </Button>
          </div>
        </div>

        {/* --- TABLE --- */}
        <div className="bg-surface border border-white/5 rounded-xl overflow-hidden shadow-2xl">
          {loading ? (
            <div className="h-64 flex items-center justify-center">
              <Loader2 size={32} className="text-bronze animate-spin" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-[10px] uppercase tracking-widest text-ash">
                    <th className="p-6 font-medium">Date</th>
                    <th className="p-6 font-medium">Order ID</th>
                    <th className="p-6 font-medium">Customer</th>
                    <th className="p-6 font-medium">Items</th>
                    <th className="p-6 font-medium">Total</th>
                    <th className="p-6 font-medium">Status</th>
                    <th className="p-6 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredOrders.map((order, index) => (
                    <tr key={index} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="p-6 text-ash text-xs">
                        {new Date(order.date).toLocaleDateString()}
                      </td>
                      <td className="p-6 font-mono text-xs text-bronze">
                        {order.id}
                      </td>
                      <td className="p-6 font-serif text-lg">
                        {order.customer}
                        <div className="text-[10px] font-sans text-ash uppercase tracking-wide mt-1">{order.email}</div>
                      </td>
                      <td className="p-6 text-sm text-ash max-w-xs truncate">
                        {order.items}
                      </td>
                      <td className="p-6 text-bone font-medium">
                        ${order.total}
                      </td>
                      <td className="p-6">
                        <span className={`text-[9px] uppercase tracking-widest px-2 py-1 rounded-sm border 
                          ${order.status === 'New' ? 'border-bronze text-bronze' : 'border-ash text-ash'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-6 text-right">
                        <Button
                          onClick={() => setSelectedOrder(order)}
                          variant="ghost"
                          size="sm"
                          className="px-2 hover:bg-white/10"
                        >
                          <Eye size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))}

                  {filteredOrders.length === 0 && (
                    <tr>
                      <td colSpan="7" className="p-12 text-center text-ash text-sm italic">
                        No orders found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {selectedOrder && (
          <>
            {/* Backdrop */}
            <div
              onClick={() => setSelectedOrder(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
            />

            {/* Drawer */}
            <OrderDetail
              order={selectedOrder}
              onClose={() => setSelectedOrder(null)}
              onUpdate={handleLocalUpdate}
            />
          </>
        )}

        {/* Update the Table Row "Action" Button */}

      </main>
    </div>
  );
};

export default AdminDashboard;