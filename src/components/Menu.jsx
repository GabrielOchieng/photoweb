import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { BiX } from "react-icons/bi";

const Menu = ({ userInfo, handleLogout }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="">
      {open ? (
        <BiX
          data-testid="close-icon" // Added data-testid for close icon
          className="cursor-pointer w-14 h-14 object-cover"
          onClick={() => setOpen(false)}
        />
      ) : (
        <button
          data-testid="menu-icon" // Added data-testid for menu icon button
          className="cursor-pointer w-14 h-14 object-cover"
          aria-label="Close Menu"
        >
          <IoMenu
            className="cursor-pointer w-14 h-14 object-cover"
            onClick={() => setOpen(true)}
          />
        </button>
      )}

      {open && (
        <div
          data-testid="dropdown-menu" // Added data-testid for dropdown menu
          className="absolute bg-teal-700 text-white right-0 top-20 w-64 h-[200px] flex flex-col items-start justify-center gap-4 text-xl z-10 pl-5 rounded-b-md"
        >
          <Link to="/" className="hover:text-black">
            Home
          </Link>

          <Link to="/users" className="hover:text-black">
            Users
          </Link>

          {userInfo ? (
            <div className="flex flex-col gap-2">
              <p>Welcome {userInfo.username}</p>
              <Link to="/" onClick={handleLogout} className="hover:text-black">
                Logout
              </Link>
            </div>
          ) : (
            <Link to="/login" className="hover:text-black">
              Signin
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Menu;
