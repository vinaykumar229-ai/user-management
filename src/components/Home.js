import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import './Home.css'; 

function Home() {
  const { users, fetchUsers, loading, error } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [sortedUsers, setSortedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
    setSortedUsers(filteredUsers);
  }, [search, users]);

  const handleSort = (order) => {
    const sorted = [...sortedUsers].sort((a, b) =>
      order === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    setSortedUsers(sorted);
  };

  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;

  return (
    <div className="container">
      <h1 className="header">User Management Dashboard</h1>

      <div className="search-sort-container">
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search Users by Name"
          className="search-bar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Sort buttons */}
        <div className="sort-buttons">
          <button
            className="sort-button"
            onClick={() => handleSort("asc")}
          >
            A-Z
          </button>
          <button
            className="sort-button"
            onClick={() => handleSort("desc")}
          >
            Z-A
          </button>
        </div>
      </div>

      <div className="user-list">
        {currentUsers.map((user) => (
          <div key={user.id} className="card">
            <h2>{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>City: {user.address.city}</p>
            <Link to={`/user/${user.id}`} className="view-details-btn">
              View Details
            </Link>
          </div>
        ))}
      </div>

      <div className="pagination-buttons">
        <button
          className="pagination-button"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="pagination-button"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;
