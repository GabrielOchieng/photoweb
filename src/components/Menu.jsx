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
          className="cursor-pointer w-14 h-14 object-cover"
          onClick={() => setOpen(false)}
        />
      ) : (
        <IoMenu
          className="cursor-pointer w-14 h-14 object-cover"
          onClick={() => setOpen(true)}
        />
      )}

      {open && (
        <div className="absolute bg-teal-700 text-white right-0 top-20 w-72 h-[400px] flex flex-col items-start justify-center gap-8 text-xl z-10 pl-5 rounded-b-md">
          <Link to="/">Home</Link>

          <Link to="/users">Users</Link>

          {userInfo ? (
            <div className="flex flex-col gap-2">
              <p>Welcome {userInfo.username}</p>
              <Link to="/" onClick={handleLogout}>
                Logout
              </Link>
            </div>
          ) : (
            <Link to="/login">Signin</Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Menu;
