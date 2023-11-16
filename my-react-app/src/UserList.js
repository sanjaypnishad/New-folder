// UserList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchEmail, setSearchEmail] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`https://reqres.in/api/users?page=1&per_page=10`);
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
