import { useState } from "react";
import DashboardLayout from "../dashboard/DashboardLayout";
import { addBookApi } from "../../api/book.api";
import { useNavigate } from "react-router-dom";

export default function AddBook() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    author: "",
    condition: "used",
    exchangeType: "book",
  });
  const [images, setImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    images.forEach((img) => data.append("images", img));

    await addBookApi(data);
    navigate("/my-books");
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">Add a New Book</h1>

        <form
            onSubmit={handleSubmit}
            className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 shadow-xl space-y-6"
        >
            <div>
                <label className="block text-gray-400 text-sm font-bold mb-2">Book Title</label>
                <input
                    className="w-full bg-black border border-zinc-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="e.g. The Great Gatsby"
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                />
            </div>

            <div>
                <label className="block text-gray-400 text-sm font-bold mb-2">Author</label>
                <input
                    className="w-full bg-black border border-zinc-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="e.g. F. Scott Fitzgerald"
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                    required
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-400 text-sm font-bold mb-2">Condition</label>
                    <select
                        className="w-full bg-black border border-zinc-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                        onChange={(e) => setForm({ ...form, condition: e.target.value })}
                    >
                        <option value="new">New</option>
                        <option value="like-new">Like New</option>
                        <option value="used">Used</option>
                        <option value="old">Old</option>
                    </select>
                </div>
                <div>
                   <label className="block text-gray-400 text-sm font-bold mb-2">Exchange Type</label>
                    <select
                        className="w-full bg-black border border-zinc-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                        onChange={(e) =>
                            setForm({
                            ...form,
                            exchangeType: e.target.value,
                            })
                        }
                    >
                        <option value="book">Book Only</option>
                        <option value="book+cash">Book + Cash</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-gray-400 text-sm font-bold mb-2">Upload Images</label>
                <div className="border-2 border-dashed border-zinc-700 rounded-lg p-6 text-center hover:bg-zinc-800/50 transition cursor-pointer relative">
                    <input
                        type="file"
                        multiple
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={(e) => setImages([...e.target.files])}
                    />
                    <p className="text-gray-500">
                        {images.length > 0 ? `${images.length} files selected` : "Drag & drop or click to upload"}
                    </p>
                </div>
            </div>

            <button className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition transform active:scale-95">
                Publish Book
            </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
