// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Request= () => {
//     const nav=useNavigate()
//     const [formData, setFormData] = useState({
//         name: '',
//         bloodGroup: '',
//         requiredbloodgroup: '',
//         Age: '',
//         reason: ''
//     });
//     const BloodGroupSelect = ({ name, value, onChange }) => (
//         <select name={name} value={value} onChange={onChange} required className="input">
//           <option value="">Select Blood Group</option>
//           <option value="A+">A+</option>
//           <option value="A-">A-</option>
//           <option value="B+">B+</option>
//           <option value="B-">B-</option>
//           <option value="AB+">AB+</option>
//           <option value="AB-">AB-</option>
//           <option value="O+">O+</option>
//           <option value="O-">O-</option>
//         </select>
        
//       );

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:8000/user/request', formData);
//             alert(response.data.message);
//             nav("/")
//         } catch (error) {
//             console.error(error);
//             alert('Error creating blood request');
//         }
//     };

//     return (
//         <div>
//             <h2>Request Blood</h2>
//             <form onSubmit={handleSubmit}>
//                 <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
//                 <BloodGroupSelect 
//                     name="bloodGroup" 
//                     value={formData.bloodGroup} 
//                     onChange={handleChange} 
//                 />
//                 <BloodGroupSelect 
//                     name="requiredbloodgroup" 
//                     value={formData.requiredbloodgroup} 
//                     onChange={handleChange} 
//                 />
//                 <input type="number" name="Age" placeholder="Age" value={formData.Age} onChange={handleChange} required />
//                 <textarea name="reason" placeholder="Reason" value={formData.reason} onChange={handleChange} required />
//                 <button type="submit">Request Blood</button>
//             </form>
//         </div>
//     );
// };

// export default Request;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Request = () => {
    const nav = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        bloodGroup: '',
        requiredBloodGroup: '',
        Age: '',
        reason: ''
    });

    const BloodGroupSelect = ({ name, value, onChange }) => (
        <select name={name} value={value} onChange={onChange} required className="input">
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
    );

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/user/request', formData);
            alert(response.data.message);
            nav("/");
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
                <BloodGroupSelect
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                />
                <BloodGroupSelect
                    name="requiredBloodGroup"
                    value={formData.requiredBloodGroup}
                    onChange={handleChange}
                />
                <input type="number" name="Age" placeholder="Age" value={formData.Age} onChange={handleChange} required />
                <textarea name="reason" placeholder="Reason" value={formData.reason} onChange={handleChange} required />
                <button type="submit">Request Blood</button>
            </form>
        </div>
    );
};

export default Request;

