import { useEffect, useState, useRef } from "react";
import { getNotificationsApi, markReadApi } from "../api/notification.api";
import { useAuth } from "../context/AuthContext";

export default function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const ref = useRef();

  useEffect(() => {
    if (!user) return;
    fetchNotifications();
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [user]);

  async function fetchNotifications() {
    try {
      const res = await getNotificationsApi();
      setNotifications(res.data || []);
    } catch (err) {
      // ignore
    }
  }

  async function markRead(id) {
    try {
      await markReadApi(id);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      // ignore
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((s) => !s)}
        className="relative text-xl"
        aria-label="Notifications"
      >
        🔔
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-80 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl z-50 overflow-hidden">
          <div className="p-4 border-b border-zinc-800 font-bold text-white flex justify-between items-center">
             <span>Notifications</span>
             {unreadCount > 0 && <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">{unreadCount} New</span>}
          </div>
          <div className="max-h-80 overflow-auto custom-scrollbar">
            {notifications.length === 0 && (
              <div className="p-8 text-center text-gray-500 text-sm">
                 <p className="text-2xl mb-2">🔕</p>
                 No new notifications
              </div>
            )}
            {notifications.map((n) => (
              <div
                key={n._id}
                className={`p-4 border-b border-zinc-800/50 flex gap-3 transition hover:bg-zinc-800/50 ${
                  n.read ? "bg-transparent opacity-60" : "bg-blue-500/5"
                }`}
              >
                <div className="flex-1">
                  <p className="text-sm text-gray-200 leading-snug">{n.message}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(n.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                </div>
                {!n.read && (
                  <button
                    onClick={() => markRead(n._id)}
                    className="text-xs text-blue-400 hover:text-blue-300 font-medium whitespace-nowrap self-start mt-0.5"
                  >
                    Mark read
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
