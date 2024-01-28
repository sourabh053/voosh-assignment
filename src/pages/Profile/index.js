import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//Actions
import { SetUser } from "../../redux/usersSlice";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    dispatch(SetUser(null));
    navigate("/login");
  };
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      fetch("https://api.escuelajs.co/api/v1/auth/profile", {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.statusCode) {
            navigate("/login");
          }
          dispatch(SetUser(json));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);
  // console.log(user);
  return user === null ? (
    <div>Loading...</div>
  ) : (
    <div className="profile-page">
      <div className="card">
        <div className="image-container">
          <img src={user.avatar} alt="avatar pic" />
        </div>
        <h3>{user.name}</h3>
        <h4>{user.email}</h4>
        <p>{user.role}</p>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Profile;
