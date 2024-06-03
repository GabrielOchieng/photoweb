import { useState, useEffect } from "react";
import axios from "axios";
import UserSearchModal from "./UserSearchModal";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.data) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.data;
        setUsers(data); // Set initial users data
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
    const filteredResults = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm)
    );
    setSearchResults(filteredResults);
    setIsModalOpen(searchTerm.length > 0); // Open modal when there's a search term
  };
  const handleSearchSubmit = (event) => {
    setIsModalOpen(false);
    setSearchTerm("");
  };

  return (
    <div>
      <form
        role="search"
        className=" bg-gray-100 p-2 rounded-md w-72"
        onSubmit={handleSearchSubmit}
      >
        <input
          className=" bg-transparent outline-none w-full"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </form>
      {isModalOpen && (
        <UserSearchModal
          searchResults={searchResults}
          searchTerm={searchTerm}
          handleSearchSubmit={handleSearchSubmit}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default SearchBar;
