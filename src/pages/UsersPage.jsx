import React, { useState, useEffect } from "react";
import UserCard from "../components/UserCard";
import AlbumSkeleton from "../components/AlbumSkeleton";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userAlbums, setUserAlbums] = useState({}); // New state for album counts

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const fetchUserAlbums = async (userId) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/albums?userId=${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch albums");
      }
      const data = await response.json();
      //   console.log(data);
      return data.length; // Return the number of albums
    } catch (error) {
      console.error("Error fetching albums for user", userId, error);
      return 0; // Handle errors gracefully, return 0 for albums count
    }
  };

  useEffect(() => {
    const fetchAlbumCounts = async () => {
      const albumCounts = {};
      for (const user of users) {
        const count = await fetchUserAlbums(user.id);
        albumCounts[user.id] = count;
      }
      setUserAlbums(albumCounts);
    };

    if (users.length > 0) {
      fetchAlbumCounts();
    }
  }, [users]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center underline">Users</h1>
      {isLoading && <AlbumSkeleton />}
      {error && <p className="text-red-500">{error}</p>}
      {users.length > 0 && (
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              numAlbums={userAlbums[user.id] || 0}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default UsersPage;
