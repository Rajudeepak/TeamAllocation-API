const Employee = require('../models/employee');

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({ adminId: req.user.id });
    res.status(200).json(employees);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.addTeamMember = async (req, res) => {
  try {
    const { fullName, designation, mail, gender, teamName } = req.body;
    const teamMember = new Employee({
      fullName,
      designation,
      mail,
      gender,
      teamName,
      adminId: req.user.id,
    });
    await teamMember.save();
    res.status(201).json({ message: 'Team Member added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateTeamMember = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { teamName } = req.body;

    const updatedEmployee = await Employee.findOneAndUpdate(
      { _id: employeeId, adminId: req.user.id },
      { teamName },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Team name updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const deletedEmployee = await Employee.findOneAndRemove({
      _id: employeeId,
      adminId: req.user.id,
    });

    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

