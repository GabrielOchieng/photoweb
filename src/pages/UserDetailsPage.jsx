// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";

// const UserDetailsPage = () => {
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [albums, setAlbums] = useState([]);

//   const { userId } = useParams(); // Access user ID from route parameter

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       setIsLoading(true);
//       try {
//         const userResponse = await fetch(
//           `https://jsonplaceholder.typicode.com/users/${userId}`
//         );
//         if (!userResponse.ok) {
//           throw new Error("Failed to fetch user details");
//         }
//         const userData = await userResponse.json();

//         const albumResponse = await fetch(
//           `https://jsonplaceholder.typicode.com/albums?userId=${userId}`
//         );
//         if (!albumResponse.ok) {
//           throw new Error("Failed to fetch user albums");
//         }
//         const albumData = await albumResponse.json();

//         setUser(userData);
//         setAlbums(albumData);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchUserDetails();
//   }, [userId]); // Fetch details on user ID change

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {isLoading && <p className="text-gray-500">Loading user details...</p>}
//       {error && <p className="text-red-500">{error}</p>}
//       {user && (
//         <div>
//           <h1 className="text-3xl font-bold mb-4">{user.name}</h1>
//           <p className="text-gray-500">{user.username}</p>
//           <p className="text-gray-500">{user.email}</p>
//           <h2>Albums</h2>
//           {albums.length > 0 && (
//             <ul>
//               {albums.map((album) => (
//                 <li key={album.id} className="p-2 border-b">
//                   <Link>{album.title}</Link>
//                 </li>
//               ))}
//             </ul>
//           )}
//           {albums.length === 0 && <p>No albums found for this user.</p>}
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserDetailsPage;

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AlbumSkeleton from "../components/AlbumSkeleton";

const UserDetailsPage = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [albums, setAlbums] = useState([]);

  const navigate = useNavigate(); // Utilize useNavigate hook for navigation
  const { userId } = useParams(); // Access user ID from route parameter

  useEffect(() => {
    const fetchUserDetails = async () => {
      setIsLoading(true);
      try {
        const userResponse = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        );
        if (!userResponse.ok) {
          throw new Error("Failed to fetch user details");
        }
        const userData = await userResponse.json();

        const albumResponse = await fetch(
          `https://jsonplaceholder.typicode.com/albums?userId=${userId}`
        );
        if (!albumResponse.ok) {
          throw new Error("Failed to fetch user albums");
        }
        const albumData = await albumResponse.json();

        setUser(userData);
        setAlbums(albumData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]); // Fetch details on user ID change

  const handleAlbumClick = (albumId) => {
    navigate(`/users/${userId}/albums/${albumId}`); // Navigate to album details page
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading && <AlbumSkeleton />}
      {error && <p className="text-red-500">{error}</p>}
      {user && (
        <div>
          <h1 className="text-3xl font-bold mb-4 text-center">{user.name}</h1>
          <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-center mb-3">
            <p className="text-gray-500">Username: {user.username}</p>
            <p className="text-gray-500">Email Address: {user.email}</p>
          </div>

          <h2 className="font-medium underline text-xl text-teal-700 mb-4">
            Albums
          </h2>
          {albums.length > 0 && (
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {albums.map((album) => (
                <li
                  key={album.id}
                  className="px-2 py-4 border rounded-md hover:bg-gray-100"
                >
                  {/* Handle album click and pass album ID */}
                  <button
                    onClick={() => handleAlbumClick(album.id)}
                    className="font-bold capitalize text-start"
                  >
                    <span className="text-teal-700">Title: </span>
                    {album.title}
                  </button>
                </li>
              ))}
            </ul>
          )}
          {albums.length === 0 && <p>No albums found for this user.</p>}
        </div>
      )}
    </div>
  );
};

export default UserDetailsPage;
