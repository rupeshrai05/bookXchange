import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import ExchangeRequestModal from "./ExchangeRequestModal";

export default function BookCard({ book }) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="rounded-xl p-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition shadow-sm hover:shadow-lg group">
        <div className="overflow-hidden rounded-lg mb-3">
            <img
            src={
                book.images[0]?.startsWith("http")
                ? book.images[0]
                : `http://localhost:5001/${book.images[0]}`
            }
            alt={book.title}
            className="h-48 w-full object-cover transform group-hover:scale-105 transition duration-500"
            />
        </div>

        <h3 className="font-bold text-lg text-white truncate">{book.title}</h3>
        <p className="text-sm text-gray-400 mb-3">{book.author}</p>

        {(book.owner?._id || book.owner) !== user._id && (
          <button
            onClick={() => setOpen(true)}
            className="w-full bg-white text-black font-semibold px-3 py-2 rounded-lg text-sm hover:bg-gray-200 transition"
          >
            Request Exchange
          </button>
        )}
      </div>

      {open && (
        <ExchangeRequestModal book={book} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
