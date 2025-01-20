import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import './UserDetail.css'; 

function UserDetail() {
  const { id } = useParams();
  const { users, loading, error } = useContext(UserContext);
  const [userDetail, setUserDetail] = useState(null);

  useEffect(() => {
    const user = users.find((user) => user.id === parseInt(id));
    setUserDetail(user);
  }, [id, users]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;

  return (
    <div className="detail-container">
      {userDetail ? (
        <>
          <h1 className="detail-header">{userDetail.name}</h1>
          <div className="detail-card">
            <p><strong>Email:</strong> {userDetail.email}</p>
            <p><strong>Phone:</strong> {userDetail.phone}</p>
            <p><strong>Company:</strong> {userDetail.company.name}</p>
            <p><strong>Website:</strong> {userDetail.website}</p>
          </div>
          <Link to="/" className="go-back-btn">
            Go Back
          </Link>
        </>
      ) : (
        <p>User not found.</p>
      )}
    </div>
  );
}

export default UserDetail;
