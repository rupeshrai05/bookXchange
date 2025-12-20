import { useEffect, useState } from "react";
import DashboardLayout from "./DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getAllBooksApi, getMyBooksApi } from "../../api/book.api";
import { getMyExchangesApi } from "../../api/exchange.api";
import BookCard from "../../components/BookCard";

export default function Dashboard() {
  const { user } = useAuth();
  const [recentBooks, setRecentBooks] = useState([]);
  const [stats, setStats] = useState({
    myBooks: 0,
    activeExchanges: 0,
    pendingRequests: 0
  });

  useEffect(() => {
    // 1. Fetch all books (for "Recently Added" section)
    getAllBooksApi().then((res) => {
        const otherBooks = res.data.filter(b => b.owner?._id !== user?._id && b.owner !== user?._id);
        setRecentBooks(otherBooks.slice(0, 4));
    });

    // 2. Fetch My Books count
    getMyBooksApi().then((res) => {
        setStats(prev => ({ ...prev, myBooks: res.data.length }));
    });

    // 3. Fetch Exchanges counts
    getMyExchangesApi().then((res) => {
        const exchanges = res.data;
        const active = exchanges.filter(e => ['accepted', 'shipped'].includes(e.status)).length;
        const pending = exchanges.filter(e => e.status === 'requested').length;
        setStats(prev => ({ ...prev, activeExchanges: active, pendingRequests: pending }));
    });
  }, [user]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
          Hello, {user?.name?.split(" ")[0] || "Reader"}! 👋
        </h1>
        <p className="text-gray-400">Welcome back to your reading hub.</p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid md:grid-cols-3 gap-6 mb-12"
      >
        {/* Stats Cards */}
        {[
          { label: "My Books", value: stats.myBooks, icon: "📚", link: "/my-books", color: "blue" },
          { label: "Active Exchanges", value: stats.activeExchanges, icon: "🔄", link: "/exchanges", color: "purple" },
          { label: "Pending Requests", value: stats.pendingRequests, icon: "📩", link: "/exchanges", color: "pink" }
        ].map((stat, i) => (
          <motion.div 
            key={i}
            variants={item}
            className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-full bg-${stat.color}-500/10 text-${stat.color}-400 text-2xl`}>
                {stat.icon}
              </div>
              <Link to={stat.link} className="text-sm text-gray-500 hover:text-white">View &rarr;</Link>
            </div>
            <h3 className="text-4xl font-bold mb-1">{stat.value}</h3>
            <p className="text-gray-400 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="mb-12">
        <div className="flex justify-between items-end mb-6">
            <div>
                <h2 className="text-xl font-bold">Recently Added Books</h2>
                <p className="text-gray-400 text-sm mt-1">Fresh reads from the community</p>
            </div>
            <Link to="/books" className="text-blue-400 text-sm font-semibold hover:text-blue-300">View All &rarr;</Link>
        </div>
        
        {recentBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {recentBooks.map(book => (
                    <BookCard key={book._id} book={book} />
                ))}
            </div>
        ) : (
             <div className="p-10 text-center border border-dashed border-zinc-800 rounded-xl">
                <p className="text-gray-500">No books found from other users yet.</p>
             </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <section>
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
             <Link 
               to="/add-book"
               className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition flex flex-col items-center justify-center text-center gap-2 group"
             >
                <span className="text-3xl group-hover:scale-110 transition">➕</span>
                <span className="font-semibold text-sm">Add a Book</span>
             </Link>
             <Link 
               to="/books"
               className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition flex flex-col items-center justify-center text-center gap-2 group"
             >
                <span className="text-3xl group-hover:scale-110 transition">🔍</span>
                <span className="font-semibold text-sm">Find Books</span>
             </Link>
          </div>
        </section>

        {/* Recent Activity Placeholder */}
        <section>
          <h2 className="text-xl font-bold mb-4">Your Activity</h2>
          <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 text-center text-gray-500 py-12">
            <p>No recent activity yet.</p>
            <p className="text-sm">Start by listing a book!</p>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
