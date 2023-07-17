const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Admin = require('../models/admin');

exports.registerAdmin = async (req, res) => {
  try {

    const { adminName, email, password, confirmPassword } = req.body;
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords don't match" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({ adminName, email, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });

  }
};

exports.loginAdmin = async (req, res) => {
    try {

      const { email, password } = req.body;
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }
  
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const expiresIn = 36000;

      const token = jwt.sign({ adminId: admin._id }, process.env.key, {expiresIn});

      req.user = {
        id: admin._id,
      };
  
      res.status(200).json({
        token,
        admin: {
          id: admin._id,
          adminName: admin.adminName,
          email: admin.email
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
