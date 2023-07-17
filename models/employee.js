const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  designation: { type: String, required: true },
  mail: { type: String, required: true },
  gender: { type: String, required: true },
  teamName: { type: String, required: true },
  adminId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Admin' }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
