import { useEffect, useState } from "react";
import DashboardLayout from "../dashboard/DashboardLayout";
import { getAllUsersApi, banUserApi } from "../../api/admin.api";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const res = await getAllUsersApi();
      setUsers(res.data || []);
    } catch (err) {}
  }

  async function toggleBan(id) {
    try {
      await banUserApi(id);
      fetchUsers();
    } catch (err) {}
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">Manage Users</h1>
        <p className="text-gray-400 mt-1">View and manage platform users</p>
      </div>

      <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden shadow-xl">
        <table className="min-w-full text-left">
          <thead className="bg-black/30 border-b border-zinc-800">
            <tr>
              <th className="p-4 text-gray-400 font-medium text-sm">Name</th>
              <th className="p-4 text-gray-400 font-medium text-sm">Email</th>
              <th className="p-4 text-gray-400 font-medium text-sm">Role</th>
              <th className="p-4 text-gray-400 font-medium text-sm">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {users.map((u) => (
              <tr key={u._id} className="hover:bg-zinc-800/50 transition">
                <td className="p-4 font-semibold text-white">{u.name}</td>
                <td className="p-4 text-gray-400 font-mono text-sm">{u.email}</td>
                <td className="p-4">
                     <span className={`text-xs px-2 py-1 rounded-full uppercase font-bold ${
                         u.role === 'admin' ? 'bg-purple-500/10 text-purple-500' : 'bg-blue-500/10 text-blue-500'
                     }`}>
                        {u.role}
                     </span>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => toggleBan(u._id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      u.banned
                        ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                        : "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                    }`}
                  >
                    {u.banned ? "Unban User" : "Ban User"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
