import { useEffect, useState } from "react";
import DashboardLayout from "../dashboard/DashboardLayout";
import { getAllBooksApi } from "../../api/book.api";
import BookCard from "../../components/BookCard";

export default function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getAllBooksApi().then((res) => setBooks(res.data));
  }, []);

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
           <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Browse Books</h1>
           <p className="text-gray-400 mt-1">Discover books from the community</p>
        </div>
      </div>

      {books.length === 0 ? (
         <div className="text-center py-20">
            <p className="text-2xl mb-2">📚</p>
            <p className="text-gray-500">No books available yet.</p>
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
