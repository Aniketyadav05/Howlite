import React, { useState } from 'react';
import { X, Check, MessageSquare, Phone, Mail, Clock } from 'lucide-react';

const OrderDetail = ({ order, onClose, onUpdate }) => {
  const [updating, setUpdating] = useState(false);

  const handleStatusChange = async (newStatus) => {
    const token = sessionStorage.getItem('howlite_admin_token');
    const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

    setUpdating(true);
    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify({
          action: "updateStatus",
          orderId: order.id,
          newStatus: newStatus,
          token: token
        }),
      });

      // Update local state instantly for UX
      onUpdate(order.id, newStatus);
      onClose();
    } catch (error) {
      console.error("Failed to update", error);
    } finally {
      setUpdating(false);
    }
  };

  if (!order) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full md:w-[480px] bg-charcoal border-l border-white/10 shadow-2xl z-50 transform transition-transform duration-300 ease-out overflow-y-auto">

      {/* Header */}
      <div className="sticky top-0 bg-charcoal/95 backdrop-blur-md border-b border-white/10 p-6 flex justify-between items-center z-10">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-ash">Order Details</span>
          <h2 className="text-2xl font-serif text-bone mt-1">{order.id}</h2>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <X size={20} className="text-ash" />
        </button>
      </div>

      <div className="p-6 space-y-8">

        {/* Actions / Status */}
        <div className="space-y-4">
          <span className="text-[10px] uppercase tracking-widest text-bronze">Workflow</span>
          <div className="grid grid-cols-3 gap-3">
            {['New', 'Contacted', 'Closed'].map((status) => (
              <button
                key={status}
                onClick={() => handleStatusChange(status)}
                disabled={updating || order.status === status}
                className={`py-3 text-[10px] uppercase tracking-widest border rounded transition-all
                   ${order.status === status
                    ? 'bg-bronze border-bronze text-white'
                    : 'border-white/10 text-ash hover:border-white/30'}`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Customer Info */}
        <div className="space-y-4 pt-4 border-t border-white/5">
          <span className="text-[10px] uppercase tracking-widest text-ash">Client Profile</span>
          <div className="bg-black/20 p-4 rounded-lg space-y-3">
            <div className="flex items-center gap-3 text-bone">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs font-serif italic">
                {order.customer.charAt(0)}
              </div>
              <span className="text-lg font-serif italic">{order.customer}</span>
            </div>

            <div className="space-y-2 pl-11">
              <a href={`mailto:${order.email}`} className="flex items-center gap-2 text-sm text-ash hover:text-bronze transition-colors">
                <Mail size={14} /> {order.email}
              </a>
              <a href={`tel:${order.phone}`} className="flex items-center gap-2 text-sm text-ash hover:text-bronze transition-colors">
                <Phone size={14} /> {order.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="space-y-4 pt-4 border-t border-white/5">
          <span className="text-[10px] uppercase tracking-widest text-ash">Manifest</span>
          <div className="bg-black/20 p-4 rounded-lg">
            <p className="text-sm text-bone leading-relaxed whitespace-pre-line">
              {order.items}
            </p>
            <div className="mt-4 pt-4 border-t border-white/5 flex justify-between text-sm">
              <span className="text-ash">Total Estimate</span>
              <span className="text-bronze font-medium">${order.total}</span>
            </div>
          </div>
        </div>

        {/* Message */}
        {order.message && (
          <div className="space-y-4 pt-4 border-t border-white/5">
            <span className="text-[10px] uppercase tracking-widest text-ash">Notes</span>
            <div className="bg-bronze/5 border border-bronze/20 p-4 rounded-lg text-sm text-bone italic leading-relaxed">
              "{order.message}"
            </div>
          </div>
        )}

        {/* Metadata */}
        <div className="pt-8 text-center">
          <div className="inline-flex items-center gap-2 text-[10px] text-ash/30 uppercase tracking-widest">
            <Clock size={12} />
            <span>Received {new Date(order.date).toLocaleString()}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderDetail;