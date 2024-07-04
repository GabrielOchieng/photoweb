import { useDispatch, useSelector } from "react-redux";
import Menu from "./Menu";
import SearchBar from "./SearchBar";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../redux/slices/usersApiSlice";
import { logout } from "../redux/slices/authSlice";
import { IoMdPhotos } from "react-icons/io";
import UserSearchModal from "./UserSearchModal";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
        console.log(data);
        setUsers(data);
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
    setShowModal(searchTerm.length > 0); // Open modal when there's a search term
  };
  const handleSearchSubmit = (event) => {
    setShowModal(false);
    setSearchTerm("");
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };
  return (
    <div className="h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative shadow-md">
      {/* MOBILE */}
      <div className="h-full flex items-center justify-between md:hidden">
        <Link to="/" className="flex items-center">
          {" "}
          {/* Replace with routing library if needed */}
          <IoMdPhotos className="w-12 h-12 object-cover text-teal-700" />
          <div className="text-2xl tracking-wide">PHOTOWEB</div>
        </Link>
        <Menu userInfo={userInfo} handleLogout={handleLogout} />
      </div>
      {/* BIGGER SCREENS */}
      <div className="hidden md:flex items-center justify-between gap-8 h-full ">
        {/* LEFT */}
        <div className="w-1/3 xl:w-2/3 flex items-center gap-12">
          <Link to="/" className="flex items-center gap-2">
            {" "}
            <IoMdPhotos className="w-12 h-12 object-cover text-teal-700" />
            <div className="text-2xl tracking-wide">PHOTOWEB</div>
          </Link>
          <div className="hidden xl:flex gap-4">
            <Link to="/" className=" hover:underline">
              Home
            </Link>
            <Link to="/users" className=" hover:underline">
              Users
            </Link>

            {userInfo ? (
              <div className="flex gap-5">
                <p>Welcome {userInfo.username}</p>
                <Link
                  to="/"
                  onClick={handleLogout}
                  className=" hover:underline"
                >
                  Logout
                </Link>
              </div>
            ) : (
              <Link to="/login">Signin</Link>
            )}
          </div>
        </div>
        {/* RIGHT */}
        <div className="w-2/3 xl:w-1/3 flex items-center justify-between gap-8">
          <SearchBar
            searchTerm={searchTerm}
            onChange={handleSearchChange}
            onSubmit={handleSearchSubmit}
          />
          {showModal && (
            <UserSearchModal
              searchResults={searchResults}
              onClose={handleCloseModal}
              searchTerm={searchTerm}
              handleSearchSubmit={handleSearchSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
