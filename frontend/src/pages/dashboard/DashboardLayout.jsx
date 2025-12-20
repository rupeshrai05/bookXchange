import Navbar from "../../components/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500 selection:text-white font-sans">
      <Navbar />
      <main className="pt-24 px-6 max-w-7xl mx-auto pb-12">
        {children}
      </main>
    </div>
  );
}
