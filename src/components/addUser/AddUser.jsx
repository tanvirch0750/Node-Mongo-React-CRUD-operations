import React from "react";

const AddUser = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const user = { name, email };

    // send data to the server
    fetch("http://localhost:5000/user", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("user added successfully");
        e.target.reset();
      });
  };
  return (
    <div>
      <h1>Add user</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="name" name="name" required />
        <br></br>
        <input type="email" placeholder="email" name="email" required />
        <br></br>

        <br />
        <input className="btn" type="submit" value="add user" />
      </form>
    </div>
  );
};

export default AddUser;
