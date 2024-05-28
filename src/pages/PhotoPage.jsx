import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PhotoSkeleton from "../components/PhotoSkeleton";

const PhotoPage = () => {
  const [photo, setPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const { userId, albumId, photoId } = useParams(); // Access user ID, album ID, and photo ID from route parameters
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPhotoDetails = async () => {
      setIsLoading(true);
      try {
        const photoResponse = await fetch(
          `https://jsonplaceholder.typicode.com/photos/${photoId}`
        );
        if (!photoResponse.ok) {
          throw new Error("Failed to fetch photo details");
        }
        const photoData = await photoResponse.json();
        setPhoto(photoData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotoDetails();
  }, [userId, albumId, photoId]); // Fetch details on parameter change

  const handleEditTitle = () => {
    setIsEditingTitle(!isEditingTitle);
    setNewTitle(photo.title); // Set initial edit value to current title
  };

  const handleSaveTitle = async () => {
    if (!newTitle) return; // Prevent saving empty title

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/photos/${photoId}`,
        {
          method: "PATCH", // Use PATCH for partial updates
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: newTitle }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update photo title");
      }

      const updatedPhoto = await response.json();
      setPhoto(updatedPhoto); // Update local state with the updated photo
      setNewTitle(updatedPhoto.title); // Update newTitle state with edited value

      setIsEditingTitle(false);
    } catch (error) {
      console.error("Error updating photo title:", error);
    }
  };

  // const handleSaveTitle = async () => {
  //   if (!newTitle) return; // Prevent saving empty title

  //   // Simulate updating photo title (replace with actual update logic)
  //   console.log("Saving new title:", newTitle);
  //   setIsEditingTitle(false);
  // };

  const handleCancelEdit = () => {
    setIsEditingTitle(false);
    setNewTitle(photo.title); // Reset edit value to current title
  };

  return (
    <div className="container mx-auto px-4 py-8 h-screen">
      {isLoading && <PhotoSkeleton />}
      {error && <p className="text-red-500">{error}</p>}
      {photo && (
        <div>
          <h2 className="font-bold mb-2 text-center capitalize underline text-xl sm:text-2xl">
            {photo.title}
          </h2>
          <div className=" flex gap-5 justify-center">
            <p className="text-gray-500">Album ID: {photo.albumId}</p>
            <p className="text-gray-500">PhotoId: {photo.id}</p>
          </div>

          {!isEditingTitle && (
            <button
              className="bg-teal-700 text-black border rounded-md px-4 py-2 my-2 hover:bg-gray-500 hover:text-white"
              onClick={handleEditTitle}
            >
              Edit Title
            </button>
          )}
          {isEditingTitle && (
            <div className="my-2">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 w-full mb-2"
              />
              <button
                className="bg-teal-700 text-white border rounded-md px-4 py-2 mr-3"
                onClick={handleSaveTitle}
              >
                Save
              </button>
              <button
                className="bg-green-500 text-black border rounded-md px-4 py-2"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            </div>
          )}
          <img
            src={photo.url}
            alt={photo.title}
            className="w-full h-96 object-cover mb-4"
          />

          <button
            className="bg-teal-700 text-white font-bold border rounded-md w-full mt-4 py-2"
            onClick={() => navigate(`/users/${userId}/albums/${albumId}`)}
          >
            Back to Album
          </button>
        </div>
      )}
    </div>
  );
};

export default PhotoPage;
