import { useEffect, useState } from "react";
import DashboardLayout from "../dashboard/DashboardLayout";
import { getMyBooksApi } from "../../api/book.api";
import BookCard from "../../components/BookCard";

export default function MyBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getMyBooksApi().then((res) => setBooks(res.data));
  }, []);

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
           <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">My Books</h1>
           <p className="text-gray-400 mt-1">Manage your library</p>
        </div>
        <a href="/add-book" className="bg-white text-black px-4 py-2 rounded-lg font-bold hover:bg-gray-200 transition">
            + Add Book
        </a>
      </div>

      {books.length === 0 ? (
         <div className="text-center py-20 border border-dashed border-zinc-800 rounded-xl">
            <p className="text-4xl mb-4">📖</p>
            <p className="text-gray-400 mb-4">You haven't listed any books yet.</p>
            <a href="/add-book" className="text-blue-400 hover:underline">Add your first book</a>
         </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
            <BookCard key={book._id} book={book} />
            ))}
        </div>
      )}
    </DashboardLayout>
  );
}
