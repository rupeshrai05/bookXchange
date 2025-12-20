import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../dashboard/DashboardLayout";
import { getMessagesApi, sendMessageApi } from "../../api/chat.api";
import { getExchangeByIdApi } from "../../api/exchange.api";
import ShipmentPanel from "../../components/ShipmentPanel";
import { useAuth } from "../../context/AuthContext";
import {
  connectSocket,
  joinExchangeRoom,
  onNewMessage,
  disconnectSocket,
} from "../../socket/socket";

export default function ExchangeDetail() {
  const { id } = useParams();
  const { user } = useAuth();

  const [exchange, setExchange] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const exRes = await getExchangeByIdApi(id);
        const msgRes = await getMessagesApi(id);

        if (!mounted) return;

        setExchange(exRes.data);
        setMessages(msgRes.data || []);
      } catch (err) {
        console.error("Failed to load exchange or messages", err);
        setError(err?.response?.data?.message || "Failed to load exchange");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    // socket setup (guarded)
    const token = localStorage.getItem("token");
    const sock = connectSocket(token);

    const messageHandler = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    if (sock) {
      joinExchangeRoom(id);
      onNewMessage(messageHandler);
    }

    return () => {
      mounted = false;
      disconnectSocket();
    };
  }, [id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      await sendMessageApi(id, text);
      setText("");
    } catch (err) {
      console.error("Failed to send message", err);
      alert(err.response?.data?.message || "Failed to send message");
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <p className="text-center mt-10">Loading exchange...</p>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="max-w-3xl mx-auto bg-white rounded shadow p-6 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Retry
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Section */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl flex flex-col h-[70vh] overflow-hidden">
            <div className="p-4 border-b border-zinc-800 bg-black/20 flex justify-between items-center">
                <div className="font-bold text-white flex items-center gap-2">
                    <span className="text-xl">💬</span> Exchange Chat
                </div>
                {exchange && (
                    <span className={`text-xs px-2 py-1 rounded-full uppercase font-bold ${
                        exchange.status === 'accepted' ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'
                    }`}>
                        {exchange.status}
                    </span>
                )}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-black/40">
                {messages.length === 0 && (
                    <p className="text-center text-gray-500 text-sm mt-10">Start the conversation!</p>
                )}
                {messages.map((msg) => {
                    const isMe = msg.sender._id === user?._id;
                    return (
                        <div key={msg._id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                                isMe 
                                ? 'bg-blue-600 text-white rounded-br-none' 
                                : 'bg-zinc-800 text-gray-200 rounded-bl-none'
                            }`}>
                                {!isMe && <p className="text-xs text-gray-500 mb-1 font-bold">{msg.sender.name}</p>}
                                <p>{msg.message}</p>
                            </div>
                        </div>
                    )
                })}
                <div ref={bottomRef} />
            </div>

            <form onSubmit={sendMessage} className="p-4 border-t border-zinc-800 bg-zinc-900 flex gap-3">
                <input
                    className="flex-1 bg-black border border-zinc-700 rounded-full px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder={["completed", "rejected"].includes(exchange?.status) ? "Chat is closed" : "Type a message..."}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    disabled={["completed", "rejected"].includes(exchange?.status)}
                />
                <button 
                    disabled={["completed", "rejected"].includes(exchange?.status)}
                    className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center transition shadow-lg shadow-blue-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    ➤
                </button>
            </form>
        </div>

        {/* Sidebar / Shipment */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 h-fit">
            <h3 className="font-bold text-gray-400 text-sm uppercase tracking-wide mb-4">Actions</h3>
             {/* We can re-use ShipmentPanel but need to adjust its internal styling which we already did */}
             <div className="-mt-6">
                <ShipmentPanel
                    exchange={exchange}
                    onExchangeUpdated={(ex) => setExchange(ex)}
                />
             </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
