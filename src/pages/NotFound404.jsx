// NotFound404.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NotFound404 = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full bg-body-bg dark:bg-body-bg-dark flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 xl:px-12 transition-colors duration-200">
      <div className="w-full space-y-8 sm:space-y-10 lg:space-y-12 text-center">
        {/* 404 Illustration */}
        <div className="relative flex justify-center">
          <h1 className="text-7xl sm:text-9xl lg:text-[12rem] xl:text-[14rem] font-extrabold text-gray-900 dark:text-gray-100 tracking-widest">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl sm:text-2xl lg:text-4xl xl:text-5xl font-bold text-indigo-600 dark:text-indigo-400 transform -rotate-12">
              Oops!
            </span>
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4 lg:space-y-6 px-4 sm:px-0">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white">
            Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base lg:text-lg xl:text-xl mx-auto sm:max-w-2xl lg:max-w-4xl">
            Sorry, we couldn’t find the page you’re looking for. It might have
            been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6 flex flex-col sm:flex-row justify-center px-4 sm:px-0">
          <Link
            to="/"
            className="w-full sm:w-auto max-w-xs sm:max-w-none px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 bg-indigo-600 dark:bg-indigo-500 
            text-white font-medium rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-600 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
            dark:focus:ring-offset-gray-900 transition duration-150 ease-in-out text-sm sm:text-base lg:text-lg cursor-pointer"
          >
            Back to Home
          </Link>
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto max-w-xs sm:max-w-none px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 bg-gray-200 dark:bg-gray-700 
            text-gray-900 dark:text-gray-100 font-medium rounded-md hover:bg-gray-300 
            dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 
            focus:ring-gray-500 dark:focus:ring-offset-gray-900 transition duration-150 ease-in-out text-sm sm:text-base lg:text-lg cursor-pointer"
          >
            Previous Page
          </button>
        </div>
      </div>

      {/* Footer Decoration */}
      <div className="mt-12 sm:mt-16 lg:mt-20 xl:mt-24 text-gray-500 dark:text-gray-400 text-xs sm:text-sm lg:text-base">
        <p>Error 404 | © {new Date().getFullYear()} Flexiyo</p>
      </div>
    </div>
  );
};

export default NotFound404;
