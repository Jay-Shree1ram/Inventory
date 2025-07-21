import { Link } from 'react-router-dom';
import './Glitch404.css';

export default function Glitch404() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-8xl font-extrabold relative glitch" data-text="404">
          404
        </h1>
        <p className="mt-4 text-lg text-gray-400">Oops! That page doesn't exist (or it's hiding).</p>
        <Link
          to="/"
          className="mt-8 inline-block px-6 py-3 text-black bg-white font-semibold rounded hover:bg-gray-200 transition-all duration-200"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
