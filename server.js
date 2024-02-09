const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// use cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://<username>:<password>@<cluster>/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error("Mongo connection error",err));

// Define Employee schema and model using Mongoose
const employeeSchema = new mongoose.Schema({
  empName: String,
  dob: Date,
  registeredID: String,
  jobField: String
});

const Employee = mongoose.model('Employee', employeeSchema);

// Route to handle form submissions
app.post('/add-employee', (req, res) => {
  const { empName, dob, registeredID, jobField } = req.body;
  const newEmployee = new Employee({ empName, dob, registeredID, jobField });
  newEmployee.save()
    .then(() => res.status(200).json({ message: 'Employee added successfully' }))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
