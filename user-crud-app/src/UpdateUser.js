import React, { useState } from 'react';
import axios from 'axios';

const UpdateUser = ({ userId }) => {
  const [updatedUser, setUpdatedUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://reqres.in/api/users/${userId}`, updatedUser);
      alert('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div>
      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" name="first_name" onChange={handleChange} />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" name="last_name" onChange={handleChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default UpdateUser;
