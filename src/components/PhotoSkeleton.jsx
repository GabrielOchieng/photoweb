import React from "react";

const PhotoSkeleton = () => {
  return (
    <ul className="flex flex-col  justify-between gap-10">
      <li className="p-4 bg-gray-100 rounded-md shadow-md animate-pulse flex flex-col gap-1 w-full">
        <h2 className="h-5 bg-gray-400 rounded mb-2"></h2>
        <p className="h-3 bg-gray-300 rounded mb-2"></p>
      </li>
      <li className="p-4 bg-gray-100 rounded-md shadow-md animate-pulse flex flex-col gap-1 w-[18%]">
        <h2 className="h-5 bg-gray-400 rounded mb-2"></h2>
      </li>
      <li className="p-4 bg-gray-100 rounded-md shadow-md animate-pulse flex flex-col gap-1 w-full h-64">
        <h2 className="h-5 bg-gray-400 rounded mb-2"></h2>
        <p className="h-3 bg-gray-300 rounded mb-2"></p>
        <p className="h-3 bg-gray-200 rounded"></p>
      </li>
    </ul>
  );
};

export default PhotoSkeleton;
