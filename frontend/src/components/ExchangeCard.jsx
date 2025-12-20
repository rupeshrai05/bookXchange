import { Link } from "react-router-dom";

export default function ExchangeCard({ exchange, onAccept, onReject }) {
  const status = exchange.status.toLowerCase();

  return (
    <div className="rounded-xl p-5 bg-zinc-900 border border-zinc-800 shadow-sm transition hover:border-zinc-700">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
           <p className="text-xs text-gray-500 uppercase tracking-wide">Requested</p>
           <p className="font-semibold text-white truncate">{exchange.requestedBook.title}</p>
        </div>
        <div>
           <p className="text-xs text-gray-500 uppercase tracking-wide">Offered</p>
           <p className="font-semibold text-white truncate">{exchange.offeredBook.title}</p>
        </div>
      </div>

      <div className="flex justify-between items-center bg-black/30 p-3 rounded-lg border border-zinc-800">
        <span className={`text-sm font-bold uppercase ${
            status === 'accepted' ? 'text-green-500' : 
            status === 'rejected' ? 'text-red-500' : 'text-yellow-500'
        }`}>
            {exchange.status}
        </span>

        {onAccept && status === "requested" && (
            <div className="flex gap-2">
            <button
                onClick={() => onAccept(exchange._id)}
                className="bg-green-600 hover:bg-green-500 text-white px-4 py-1.5 rounded-full text-xs font-bold transition"
            >
                Accept
            </button>

            <button
                onClick={() => onReject(exchange._id)}
                className="bg-red-600 hover:bg-red-500 text-white px-4 py-1.5 rounded-full text-xs font-bold transition"
            >
                Reject
            </button>
            </div>
        )}

        {["accepted", "completed", "shipped"].includes(status)  && (
            <Link
            to={`/exchanges/${exchange._id}`}
            className="text-blue-400 hover:text-blue-300 text-sm font-semibold"
            >
            Chat & Track &rarr;
            </Link>
        )}
      </div>
    </div>
  );
}
