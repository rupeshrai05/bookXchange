import { useEffect, useState } from "react";
import DashboardLayout from "../dashboard/DashboardLayout";
import { getAllReportsApi, resolveReportApi } from "../../api/report.api";

export default function ReportsPage() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  async function fetchReports() {
    try {
      const res = await getAllReportsApi();
      setReports(res.data || []);
    } catch (err) {}
  }

  async function resolve(id) {
    try {
      await resolveReportApi(id);
      fetchReports();
    } catch (err) {}
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">User Reports</h1>
        <p className="text-gray-400 mt-1">Review flagged content and issues</p>
      </div>

      <div className="bg-zinc-900 rounded-xl border border-zinc-800 shadow-xl overflow-hidden divide-y divide-zinc-800">
        {reports.length === 0 && (
          <div className="p-12 text-center text-gray-500">
             <p className="text-4xl mb-4">✅</p>
             No reports pending.
          </div>
        )}
        {reports.map((r) => (
          <div
            key={r._id}
            className="p-6 flex flex-col md:flex-row justify-between items-start hover:bg-zinc-800/30 transition"
          >
            <div className="mb-4 md:mb-0">
              <div className="font-bold text-lg text-white mb-1">{r.title || "Report"}</div>
              <div className="text-gray-400">{r.description}</div>
              <div className="text-xs text-gray-600 mt-2">Reported on {new Date(r.createdAt).toLocaleDateString()}</div>
            </div>
            <div className="flex items-center gap-4">
              <div
                className={`text-xs px-3 py-1 rounded-full font-bold uppercase ${
                  r.resolved ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                }`}
              >
                {r.resolved ? "Resolved" : "Open"}
              </div>
              {!r.resolved && (
                <button
                  onClick={() => resolve(r._id)}
                  className="px-4 py-2 bg-white text-black text-sm font-bold rounded-lg hover:bg-gray-200 transition"
                >
                  Resolve Issue
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
