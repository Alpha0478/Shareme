import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import FooterButton from '../components/FooterButton.jsx'

const ProfileImg = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      {currentUser ? (
        <>
          {currentUser?.profileUrl ? (
            <Link
              aria-label="your profile page"
              to="/Profile"
              style={{ textDecoration: "none" }}
            >
           
            <img
              src={currentUser?.profileUrl}
              alt="profile button"
              className="rounded-full bg-[#999] w-10 h-10 lg:w-20 lg:h-20"
            />

            </Link>
          ) : (
            <FooterButton
             Icon={FaUserCircle}
             Name="You"
             To="/profile"
            />
          )}
        </>
      ) : (
        <FooterButton
        Icon={FaUserCircle}
        Name="Login"
        To="/signin"
       />
      )}
    </>
  );
};

export default ProfileImg;
