import React, { useState } from 'react';
import axios from 'axios';

const Request= () => {
    const [formData, setFormData] = useState({
        name: '',
        bloodGroup: '',
        requiredbloodgroup: '',
        Age: '',
        reason: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/user/request', formData);
            alert(response.data.message);
        } catch (error) {
            console.error(error);
            alert('Error creating blood request');
        }
    };

    return (
        <div>
            <h2>Request Blood</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                <input type="text" name="bloodGroup" placeholder="Your Blood Group" value={formData.bloodGroup} onChange={handleChange} required />
                <input type="text" name="requiredbloodgroup" placeholder="Required Blood Group" value={formData.requiredbloodgroup} onChange={handleChange} required />
                <input type="number" name="Age" placeholder="Age" value={formData.Age} onChange={handleChange} required />
                <textarea name="reason" placeholder="Reason" value={formData.reason} onChange={handleChange} required />
                <button type="submit">Request Blood</button>
            </form>
        </div>
    );
};

export default Request;
