import { useEffect, useState } from "react";
import DashboardLayout from "../dashboard/DashboardLayout";
import {
  getAllUsersApi,
  getAllBooksApi,
  getAllExchangesApi,
} from "../../api/admin.api";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ users: 0, books: 0, exchanges: 0 });

  useEffect(() => {
    async function fetchStats() {
      try {
        const [u, b, e] = await Promise.all([
          getAllUsersApi(),
          getAllBooksApi(),
          getAllExchangesApi(),
        ]);
        setStats({
          users: u.data.length || 0,
          books: b.data.length || 0,
          exchanges: e.data.length || 0,
        });
      } catch (err) {
        // ignore
      }
    }
    fetchStats();
  }, []);

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">Admin Dashboard</h1>
        <p className="text-gray-400 mt-1">Platform overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition">
          <div className="text-sm text-gray-400 uppercase tracking-wide mb-2">Total Users</div>
          <div className="text-4xl font-bold text-white mb-2">{stats.users}</div>
          <p className="text-xs text-green-500 font-bold">↑ Active Members</p>
        </div>

        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition">
          <div className="text-sm text-gray-400 uppercase tracking-wide mb-2">Total Books</div>
          <div className="text-4xl font-bold text-white mb-2">{stats.books}</div>
          <p className="text-xs text-blue-500 font-bold">📚 Library Size</p>
        </div>

        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition">
          <div className="text-sm text-gray-400 uppercase tracking-wide mb-2">Total Exchanges</div>
          <div className="text-4xl font-bold text-white mb-2">{stats.exchanges}</div>
          <p className="text-xs text-purple-500 font-bold">↔️ Interactions</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
