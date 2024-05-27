import React, { useState, useEffect } from "react";
import AlbumSkeleton from "../components/AlbumSkeleton";

const AlbumPage = () => {
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 10000));

        const response = await fetch(
          "https://jsonplaceholder.typicode.com/albums"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch albums");
        }
        const data = await response.json();
        setAlbums(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Albums</h1>
      {isLoading && <AlbumSkeleton />}
      {error && <p className="text-red-500">{error}</p>}
      {albums.length > 0 && (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {albums.map((album) => (
            <li key={album.id} className="p-4 bg-white rounded-md shadow-md">
              <h2 className="text-xl font-medium">{album.title}</h2>
              {/* Add more album details or link to a details page here */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AlbumPage;
