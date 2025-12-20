import { useEffect, useState } from "react";
import { getMyBooksApi } from "../api/book.api";
import { requestExchangeApi } from "../api/exchange.api";

export default function ExchangeRequestModal({ book, onClose }) {
  const [myBooks, setMyBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getMyBooksApi().then((res) => setMyBooks(res.data));
  }, []);

  const submitRequest = async () => {
    if (!selectedBook) return alert("Select a book");

    setLoading(true);
    await requestExchangeApi({
      requestedBook: book._id,
      offeredBook: selectedBook,
    });
    setLoading(false);
    onClose();
    alert("Exchange request sent");
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 w-full max-w-lg rounded-2xl shadow-2xl border border-zinc-800 p-6">
        <h2 className="text-xl font-bold mb-4 text-white">Exchange for “{book.title}”</h2>
        <p className="text-gray-400 text-sm mb-4">Select a book from your library to offer in exchange.</p>

        <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
          {myBooks.length === 0 && (
            <div className="col-span-2 text-center py-8 bg-black/30 rounded-lg border border-zinc-800">
               <p className="text-gray-400 mb-2">You don't have any books to offer.</p>
               <a href="/add-book" className="text-blue-400 hover:text-blue-300 font-semibold text-sm">Add a book first &rarr;</a>
            </div>
          )}
          {myBooks.map((b) => (
            <div
              key={b._id}
              onClick={() => setSelectedBook(b._id)}
              className={`border p-3 rounded-xl cursor-pointer transition ${
                selectedBook === b._id 
                ? "border-blue-500 bg-blue-500/10 ring-1 ring-blue-500" 
                : "border-zinc-700 bg-black/40 hover:border-zinc-500"
              }`}
            >
              <img
                src={
                  b.images[0]?.startsWith("http")
                    ? b.images[0]
                    : `http://localhost:5001/${b.images[0]}`
                }
                className="h-28 w-full object-cover rounded-lg mb-2"
              />
              <p className="text-sm font-semibold text-white truncate">{b.title}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button 
             onClick={onClose} 
             className="px-4 py-2 rounded-lg text-gray-300 hover:bg-zinc-800 transition text-sm font-medium"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={submitRequest}
            className="bg-white text-black px-6 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Request"}
          </button>
        </div>
      </div>
    </div>
  );
}
