const mongoose = require('mongoose');
const requestSchema = new mongoose.Schema({
  requiredbloodgroup:{
    type: String,
        enum: ['O+', 'O-', 'AB+', 'AB-', 'A+', 'A-', 'B+', 'B-'],
        required:true,
  },
  Age:{
    type:Number,
    required:true,
  },
  reason:{
    type:String,
    required:true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending',
  }
})
const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
