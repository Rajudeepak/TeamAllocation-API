require('dotenv').config(); 

const express = require('express');
const app = express();

const mongoose = require('mongoose');

// Importing Routes
const employeeRoutes = require('./routes/employeeRoutes');
const adminRoutes = require('./routes/adminRoutes');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors({ origin: process.env.FRONTEND_URL }));

// Connecting to MongoDB
mongoose
.connect(`mongodb+srv://${process.env.mongo_user}:${process.env.mongo_pass}@${process.env.mongo_cluster}/${process.env.mongo_db}?retryWrites=true&w=majority`,{
    useNewUrlParser : true,
    useUnifiedTopology : true,
})
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.log('Error connecting:', err);
  });

// Setting up middleware
app.use(express.json());

app.use('/', adminRoutes);

// Register routes
app.use('/employee', employeeRoutes);

app.get('/', (req, res) => {
  res.send('Hello World');
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port: ${port}`));
