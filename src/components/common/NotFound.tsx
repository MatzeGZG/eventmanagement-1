import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <h1 className="text-4xl font-bold mb-4 text-amber-700">404</h1>
      <p className="text-xl mb-6">Oops! Page not found</p>
      <p className="text-gray-600 mb-8">The page you're looking for doesn't exist or has been moved.</p>
      <Link
        to="/"
        className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-amber-900 bg-gradient-to-r from-amber-200 to-amber-300 rounded-md shadow-sm hover:from-amber-300 hover:to-amber-400 transition-all duration-200 ease-in-out transform hover:scale-105"
      >
        ← Back to Home
      </Link>
    </div>
  );
}; 