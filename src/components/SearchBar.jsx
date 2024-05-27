import { useState } from "react";
// import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [name, setName] = useState("");
  //   const navigate = useNavigate();

  //   const handleSearch = (e) => {
  //     e.preventDefault();
  //     if (name) {
  //       navigate(`/list?name=${name}`);
  //     }
  //   };

  return (
    <form
      className="flex items-center justify-between gap-4 bg-gray-100 p-2 rounded-md flex-1"
      //   onSubmit={handleSearch}
    >
      <input
        type="text"
        name="name"
        placeholder="Search"
        className="flex-1 bg-transparent outline-none"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="cursor-pointer">
        <img src="/search.png" alt="search" className="w-8 h-8" />
      </button>
    </form>
  );
};

export default SearchBar;
