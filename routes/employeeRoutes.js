const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const { authenticateUser } = require('../authMiddleware');

// Route for getting all employees
router.get('/list', authenticateUser, employeeController.getAllEmployees);

// Route for adding a team member
router.post('/add', authenticateUser, employeeController.addTeamMember);

// Route for updating a team member
router.put('/:employeeId', authenticateUser, employeeController.updateTeamMember);

// Route for deleting a team member
router.delete('/:employeeId', authenticateUser, employeeController.deleteEmployee);

module.exports = router;
