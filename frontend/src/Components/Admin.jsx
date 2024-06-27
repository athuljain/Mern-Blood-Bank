import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/Admin.css';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [bloodCounts, setBloodCounts] = useState({});
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch users
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

    // Fetch requests
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
      <div className="users-list">
        {users.map(user => (
          <div className="user-card" key={user._id}>
            <div className="user-details">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Blood Group:</strong> {user.bloodGroup}</p>
              {/* <p><strong>Quantity:</strong> {user.quantity}</p> */}
            </div>
          </div>
        ))}
      </div>

      <div>
        <h2>Blood Counts</h2>
        <ul>
          {Object.entries(bloodCounts).map(([type, count]) => (
            <li key={type}>{type}: {count}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>All Requests</h2>
        <ul>
          {requests.map(request => (
            <li key={request._id}>
              <h2>Name :{request.name}</h2>
              <h3>Require Blood Group:{request.requiredbloodgroup}</h3>
             
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
    </div>
  );
};

export default Admin;
