


import React, { useState } from 'react';
import axios from 'axios';
import '../CSS/Register.css'; // Ensure you have appropriate CSS for styling
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

export default function Request() {
  const [formData, setFormData] = useState({
    email: '',
    requiredbloodgroup: '',
    Age: '',
    reason: ''
  });

  const nav = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/user/request', formData);
      alert(response.data.message);
      nav("/");
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      alert('Error in submitting request: ' + (error.response ? error.response.data.message : error.message));
      nav("/");
    }
  };

  return (
    <div>
      <Navbar />
      <h2 className='caption-hero'>Request Blood</h2>
      <div className="request-container">
        <form onSubmit={handleSubmit} className="request-form">
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="request-input" />
          </div>
          <div className="form-group">
            <label>Required Blood Group</label>
            <select name="requiredbloodgroup" value={formData.requiredbloodgroup} onChange={handleChange} required className="request-input">
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <div className="form-group">
            <label>Age</label>
            <input type="number" name="Age" value={formData.Age} onChange={handleChange} required className="request-input" />
          </div>
          <div className="form-group">
            <label>Reason</label>
            <textarea name="reason" value={formData.reason} onChange={handleChange} required className="request-input" />
          </div>
          <button type="submit" className="submit-button">Submit Request</button>
        </form>
      </div>
    </div>
  );
}
