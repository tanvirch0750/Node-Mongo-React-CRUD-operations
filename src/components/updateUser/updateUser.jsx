import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateUser = () => {
  const [user, setUser] = useState([]);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/user/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const updatedUser = { name, email };

    // send data to the server
    fetch(`http://localhost:5000/user/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("user updated successfully");
        e.target.reset();
        navigate("/");
      });
  };

  return (
    <div>
      <h1>Update user: {user.name}</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="name" name="name" required />
        <br></br>
        <input type="email" placeholder="email" name="email" required />
        <br></br>

        <br />
        <input className="btn" type="submit" value="Update user" />
      </form>
    </div>
  );
};

export default UpdateUser;
