import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchEmail, setSearchEmail] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`https://reqres.in/api/users?page=&per_page=50`);
        setUsers(response.data.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=1&per_page=10&email=${searchEmail}`);
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };


  const handleEdit = (userId) => {
    console.log(`Editing user with ID: ${userId}`);
  };
  

  const columns = [
    {
      dataField: 'id',
      text: 'ID',
    },
    {
      dataField: 'first_name',
      text: 'First Name',
    },
    {
      dataField: 'last_name',
      text: 'Last Name',
    },
    {
      dataField: 'email',
      text: 'Email',
    },
    {
        dataField: 'id',
        text: 'Actions',
        formatter: (cell, row) => (
          <button onClick={() => handleEdit(row.id)}>Edit</button>
        ),
      },
  ];

  return (
    <div>
      <h2>User List</h2>
      <label>
        Search by Email:
        <input type="text" value={searchEmail} onChange={(e) => setSearchEmail(e.target.value)} />
        <button onClick={handleSearch}>Search</button>
      </label>
      <BootstrapTable keyField='id' data={users} columns={columns} />
    </div>
  );
};

export default UserList;
