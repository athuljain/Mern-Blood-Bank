import React, { useState } from 'react';
import axios from 'axios';
import '../CSS/Donate.css';
import Navbar from './Navbar';

export default function Donation() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bloodGroup: '',
    quantity: '',
    diseases: '',
    dateofbirth: '',
    weight: '',
    height: '',
    dateofdonation: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/user/donate', formData);
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert('Error in Donating');
    }
  };

  return (
    <div>
      <Navbar/>
      <h2 className='caption-hero'>Be a Hero for Those in Need</h2>
      <div className="donation-container">
        <form onSubmit={handleSubmit} className="donation-form">
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="donation-input" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="donation-input" />
          </div>
          <div className="form-group">
            <label>Blood Group</label>
            <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required className="donation-input">
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
            <label>Quantity (in ml)</label>
            <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required className="donation-input" />
          </div>
          <div className="form-group">
            <label>Diseases</label>
            <input type="text" name="diseases" value={formData.diseases} onChange={handleChange} className="donation-input" />
          </div>
          <div className="form-group">
            <label>Date of Birth</label>
            <input type="date" name="dateofbirth" value={formData.dateofbirth} onChange={handleChange} required className="donation-input" />
          </div>
          <div className="form-group">
            <label>Weight</label>
            <input type="number" name="weight" value={formData.weight} onChange={handleChange} required className="donation-input" />
          </div>
          <div className="form-group">
            <label>Height</label>
            <input type="number" name="height" value={formData.height} onChange={handleChange} required className="donation-input" />
          </div>
          <div className="form-group">
            <label>Date of Donation</label>
            <input type="date" name="dateofdonation" value={formData.dateofdonation} onChange={handleChange} required className="donation-input" />
          </div>
          <button type="submit" className="submit-button">Donate Blood</button>
        </form>
      </div>
    </div>
  );
}
