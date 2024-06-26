import React from "react";
import { Link } from "react-router-dom";
import headerBackground from "/header_background.webp";
import photos from "/photos.jpeg";

const Header = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${headerBackground})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "600px",
      }}
      className="flex flex-col md:flex-row pt-5 md:pt-0 relative"
      data-testid="header"
    >
      <div className="w-full md:w-1/2 pl-6 flex flex-col gap-6 text-white justify-center items-start">
        <h1
          className="font-bold text-3xl sm:text-5xl md:text-7xl"
          data-testid="header-title"
        >
          GLIMPSE PHOTO ALBUMS TOGETHER
        </h1>
        <p className="text-2xl" data-testid="header-description">
          View and recreate memories from photos or photo albums. Relive the
          most beautiful moments.
        </p>
        <Link
          to="/users"
          className="bg-white hover:bg-teal-700 hover:text-white rounded-full py-2 px-4 text-gray-500"
          data-testid="start-button"
        >
          Let us start
        </Link>
      </div>
      <div>
        <img
          src={photos}
          alt="photo"
          className="w-48 sm:w-72 h-48 sm:h-72 absolute bottom-10 right-20 rotate-12 "
          data-testid="photo-image"
        />
      </div>
    </div>
  );
};

export default Header;
