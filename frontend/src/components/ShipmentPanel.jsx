import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getShipmentApi,
  addShipmentApi,
  markShipmentDeliveredApi,
} from "../api/shipment.api";
import { getExchangeByIdApi } from "../api/exchange.api";

export default function ShipmentPanel({
  exchangeId,
  exchangeStatus,
  exchange,
  onExchangeUpdated,
}) {
  const { user } = useAuth();
  const [shipments, setShipments] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [tracking, setTracking] = useState("");
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const id = exchangeId || exchange?._id || exchange?.id;
  const rawStatus = exchangeStatus || exchange?.status || "requested";
  const status =
    typeof rawStatus === "string" ? rawStatus.toLowerCase() : "requested";

  useEffect(() => {
    if (!["accepted", "completed", "shipped"].includes(status)) return;
    if (!id) return;

    setLoading(true);
    getShipmentApi(id)
      .then((res) => {
        const data = res.data || {};
        setShipments(data.shipments || []);
        setAddresses(data.addresses || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id, status]);

  const myShipment = shipments.find((s) => {
    const senderId = s.sender?._id || s.sender;
    return senderId && user && senderId.toString() === user._id?.toString();
  });

  const otherShipment = shipments.find((s) => s._id !== myShipment?._id);

  const submitShipment = async () => {
    if (!tracking.trim()) {
      alert("Enter tracking number");
      return;
    }

    try {
      setActionLoading(true);
      const res = await addShipmentApi(id, {
        trackingNumber: tracking,
      });
      // response is the created/updated shipment
      const updated = res.data;
      setShipments((prev) => {
        const existingIndex = prev.findIndex((p) => p._id === updated._id);
        if (existingIndex >= 0) {
          const copy = [...prev];
          copy[existingIndex] = updated;
          return copy;
        }
        return [...prev, updated];
      });
      setTracking("");
    } catch (err) {
      console.error("Failed to add shipment", err);
      alert(err?.response?.data?.message || "Failed to add shipment");
    } finally {
      setActionLoading(false);
    }
  };

  const markDelivered = async (shipmentId) => {
    try {
      setActionLoading(true);
      const res = await markShipmentDeliveredApi(shipmentId);
      const updated = res.data;
      setShipments((prev) =>
        prev.map((s) => (s._id === updated._id ? updated : s))
      );

      // refresh exchange in parent if supported
      if (typeof onExchangeUpdated === "function") {
        try {
          const ex = await getExchangeByIdApi(id);
          onExchangeUpdated(ex.data);
        } catch (err) {
          // ignore
        }
      }
    } catch (err) {
      console.error("Failed to mark delivered", err);
      alert(err?.response?.data?.message || "Failed to mark delivered");
    } finally {
      setActionLoading(false);
    }
  };

  if (status === "requested") {
    return (
      <p className="text-sm text-gray-500 mt-4">
        Shipment will unlock after exchange is accepted.
      </p>
    );
  }

  if (loading) {
    return <p className="text-sm text-gray-500 mt-4">Loading shipment...</p>;
  }

  return (
    <div className="border border-zinc-800 rounded-xl p-6 bg-zinc-900 mt-6 max-w-3xl mx-auto shadow-sm">
      <h3 className="font-bold text-lg mb-4 text-white border-b border-zinc-800 pb-2">Shipment Details</h3>

      {/* My shipment (sender) */}
      {!myShipment ? (
        <div className="bg-black/40 p-4 rounded-lg border border-zinc-800">
           <label className="block text-sm text-gray-400 mb-2">Add Tracking Number</label>
           <div className="flex gap-3">
            <input
                className="flex-1 bg-black border border-zinc-700 p-2.5 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="e.g. UPS123456789"
                value={tracking}
                onChange={(e) => setTracking(e.target.value)}
            />

            <button
                onClick={submitShipment}
                disabled={actionLoading}
                className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg font-medium transition disabled:opacity-50"
            >
                {actionLoading ? "Saving..." : "Save"}
            </button>
           </div>
        </div>
      ) : (
        <div className="bg-black/40 p-4 rounded-lg border border-zinc-800 mb-4">
          <div className="flex justify-between items-start">
             <div>
                <p className="text-sm text-gray-400 uppercase tracking-wide">Your Shipment</p>
                 <p className="text-lg font-mono text-white mt-1">{myShipment.trackingNumber}</p>
             </div>
             <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                 myShipment.status === 'delivered' ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'
             }`}>
                {myShipment.status}
             </span>
          </div>
        </div>
      )}

      {/* Other participant's shipment — receiver can mark delivered */}
      {otherShipment && (
        <div className="mt-4 border-t border-zinc-800 pt-4">
           <div className="flex justify-between items-center bg-zinc-800/50 p-4 rounded-lg">
             <div>
                <p className="text-sm text-gray-400 uppercase tracking-wide">Incoming Shipment</p>
                <p className="text-lg font-mono text-white mt-1">{otherShipment.trackingNumber || "—"}</p>
                <p className="text-sm text-gray-500 mt-1">Status: <span className="text-gray-300">{otherShipment.status}</span></p>
             </div>

            {otherShipment.status === "shipped" &&
                (otherShipment.receiver?._id || otherShipment.receiver) &&
                user &&
                (otherShipment.receiver._id
                ? otherShipment.receiver._id.toString() === user._id?.toString()
                : otherShipment.receiver.toString() === user._id?.toString()) && (
                <button
                    onClick={() => markDelivered(otherShipment._id)}
                    disabled={actionLoading}
                    className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg font-medium transition shadow-lg shadow-green-900/20 disabled:opacity-50"
                >
                    {actionLoading ? "Confirming..." : "Mark Received"}
                </button>
                )}
           </div>
        </div>
      )}
    </div>
  );
}
