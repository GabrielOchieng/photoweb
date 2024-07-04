import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AlbumSkeleton from "../components/AlbumSkeleton";

const AlbumDetailsPage = () => {
  const [album, setAlbum] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { userId, albumId } = useParams(); // Access of user ID and album ID from route parameters
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlbumDetails = async () => {
      setIsLoading(true);
      try {
        const albumResponse = await fetch(
          `https://jsonplaceholder.typicode.com/albums/${albumId}`
        );
        if (!albumResponse.ok) {
          throw new Error("Failed to fetch album details");
        }
        const albumData = await albumResponse.json();

        const photosResponse = await fetch(
          `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`
        );
        if (!photosResponse.ok) {
          throw new Error("Failed to fetch album photos");
        }
        const photosData = await photosResponse.json();

        // Combine album data and photos
        const detailedAlbum = { ...albumData, photos: photosData };
        setAlbum(detailedAlbum);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlbumDetails();
  }, [userId, albumId]); // Fetch details on user ID and album ID change

  const handlePhotoClick = (photoId) => {
    navigate(`/users/${userId}/albums/${albumId}/photos/${photoId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading && <AlbumSkeleton />}
      {error && <p className="text-red-500">{error}</p>}
      {album && (
        <div>
          <h1 className="text-xl sm:text-3xl font-bold mb-4 text-center capitalize underline">
            {album.title}
          </h1>
          <div className="flex justify-center gap-5">
            <p className="text-2xl  mb-3">
              {" "}
              <span className="text-teal-700">UserId:</span> {album.userId}
            </p>
            <p className="text-2xl  mb-3">
              {" "}
              <span className="text-teal-700">AlbumId:</span> {album.id}
            </p>
          </div>

          {/* Display photos */}
          <h2 className="text-xl font-medium mb-2 text-teal-700">
            <span>{album.photos.length} </span>
            Photos
          </h2>
          {album.photos.length > 0 && (
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {album.photos.map((photo) => (
                <li
                  key={photo.id}
                  className="rounded overflow-hidden cursor-pointer"
                >
                  {" "}
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-auto object-cover"
                    onClick={() => handlePhotoClick(photo.id)}
                  />
                </li>
              ))}
            </ul>
          )}
          {album.photos.length === 0 && <p>No photos found for this album.</p>}
        </div>
      )}
    </div>
  );
};

export default AlbumDetailsPage;
