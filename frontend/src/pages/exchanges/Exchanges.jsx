import { useEffect, useState } from "react";
import DashboardLayout from "../dashboard/DashboardLayout";
import {
  getMyExchangesApi,
  acceptExchangeApi,
  rejectExchangeApi,
} from "../../api/exchange.api";
import ExchangeCard from "../../components/ExchangeCard";
import { useAuth } from "../../context/AuthContext";

export default function Exchanges() {
  const [exchanges, setExchanges] = useState([]);
  const { user } = useAuth();

  const fetchExchanges = () => {
    getMyExchangesApi().then((res) => setExchanges(res.data));
  };

  useEffect(() => {
    fetchExchanges();
  }, []);

  const handleAccept = async (id) => {
    await acceptExchangeApi(id);
    fetchExchanges();
  };

  const handleReject = async (id) => {
    await rejectExchangeApi(id);
    fetchExchanges();
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-emerald-500 bg-clip-text text-transparent">My Exchanges</h1>
        <p className="text-gray-400 mt-1">Track your book trades</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {exchanges.length === 0 && (
             <div className="col-span-full text-center py-20 border border-dashed border-zinc-800 rounded-xl">
                <p className="text-4xl mb-4">🔄</p>
                <p className="text-gray-400">No active exchanges.</p>
             </div>
        )}
        {exchanges.map((ex) => {
          const isOwner = ex.owner._id === user._id;

          return (
            <ExchangeCard
              key={ex._id}
              exchange={ex}
              onAccept={isOwner ? handleAccept : null}
              onReject={isOwner ? handleReject : null}
            />
          );
        })}
      </div>
    </DashboardLayout>
  );
}
