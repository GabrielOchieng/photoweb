import { useNavigate } from "react-router";
import { IoPersonCircleOutline } from "react-icons/io5";

const UserCard = ({ user, isSelected, numAlbums }) => {
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate(`/users/${user.id}`);
  };

  return (
    <li
      className={`p-4 bg-white rounded-md shadow-md cursor-pointer hover:bg-gray-100 ${
        isSelected ? "border border-blue-500" : ""
      }`}
      onClick={handleUserClick}
    >
      <div className="flex items-center gap-2 ">
        <IoPersonCircleOutline className="h-24 w-24 text-teal-700" />
        <h2 className="text-xl font-bold">{user.name}</h2>
      </div>

      <p className="text-gray-500">
        {" "}
        <span className="text-teal-700 font-medium">Username:</span>{" "}
        {user.username}
      </p>
      <p className="text-gray-500">
        {" "}
        <span className="text-teal-700 font-medium">Email Address:</span>{" "}
        {user.email}
      </p>
      {numAlbums > 0 && (
        <p className="mt-2 text-gray-500">
          {" "}
          <span className="text-teal-700 font-medium">
            Number of Albums:
          </span>{" "}
          {numAlbums}
        </p>
      )}
    </li>
  );
};

export default UserCard;
