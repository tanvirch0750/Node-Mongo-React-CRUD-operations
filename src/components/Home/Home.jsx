import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/user")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleUserDelete = (id) => {
    const proceed = window.confirm("Are you sure you want to delete");
    if (proceed) {
      const url = `http://localhost:5000/user/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
            const remaining = users.filter((user) => user._id !== id);
            setUsers(remaining);
          }
        });
      console.log("delteing user with id: ", id);
    }
  };

  const navigate = useNavigate();
  const handleUserUpdate = (id) => {
    navigate(`/user/update/${id}`);
  };

  return (
    <div>
      <div className="users">
        <table>
          <caption>Users</caption>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => handleUserDelete(user._id)}>
                    delete
                  </button>
                </td>
                <td>
                  <button
                    className="update"
                    onClick={() => handleUserUpdate(user._id)}
                  >
                    update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
