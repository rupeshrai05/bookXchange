import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="mb-4">Page not found.</p>
        <Link to="/dashboard" className="text-blue-600">
          Go home
        </Link>
      </div>
    </div>
  );
}
