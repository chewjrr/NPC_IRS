const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const db = require('./database');
const addressRoutes = require('./routes/addressRoutes');
const residentRoutes = require('./routes/residentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use('/addresses', addressRoutes);
app.use('/residents', residentRoutes);

db.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error('Error connecting to the database:', err));