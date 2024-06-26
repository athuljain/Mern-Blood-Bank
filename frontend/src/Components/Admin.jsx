


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/Admin.css';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [bloodCounts, setBloodCounts] = useState({});
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch all users
    axios.get('http://localhost:8000/admin/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });

    // Fetch blood counts
    axios.get('http://localhost:8000/admin/blood-count')
      .then(response => {
        setBloodCounts(response.data);
      })
      .catch(error => {
        console.error('Error fetching blood counts:', error);
      });

    // Fetch all requests
    axios.get('http://localhost:8000/admin/requests')
      .then(response => {
        setRequests(response.data);
      })
      .catch(error => {
        console.error('Error fetching requests:', error);
      });
  }, []);

  const acceptRequest = (requestId) => {
    axios.put(`http://localhost:8000/admin/request/${requestId}/accept`)
      .then(response => {
        console.log(response.data);
        // Update requests after accepting
        const updatedRequests = requests.map(request => 
          request._id === requestId ? { ...request, status: 'Accepted' } : request
        );
        setRequests(updatedRequests);

        // Update blood counts
        axios.get('http://localhost:8000/admin/blood-count')
          .then(response => {
            setBloodCounts(response.data);
          })
          .catch(error => {
            console.error('Error fetching blood counts:', error);
          });
      })
      .catch(error => {
        console.error('Error accepting request:', error);
      });
  };

  const deleteRequest = (requestId) => {
    axios.delete(`http://localhost:8000/admin/request/${requestId}`)
      .then(response => {
        console.log(response.data);
        // Update requests after deleting
        const updatedRequests = requests.filter(request => request._id !== requestId);
        setRequests(updatedRequests);
      })
      .catch(error => {
        console.error('Error deleting request:', error);
      });
  };

  return (
    <div className="container">
      <h2>All Users</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.name}, {user.email}, {user.bloodGroup}, {user.quantity}
          </li>
        ))}
      </ul>

      <h2>Blood Counts</h2>
      <ul>
        {Object.entries(bloodCounts).map(([type, count]) => (
          <li key={type}>{type}: {count}</li>
        ))}
      </ul>

      <h2>All Requests</h2>
      <ul>
        {requests.map(request => (
          <li key={request._id}>
            {request.name} - {request.requiredbloodgroup}
            <button 
              onClick={() => acceptRequest(request._id)} 
              disabled={request.status === 'Accepted'}
            >
              {request.status === 'Accepted' ? 'Accepted' : 'Accept'}
            </button>
            <button onClick={() => deleteRequest(request._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
