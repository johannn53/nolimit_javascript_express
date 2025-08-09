const express = require('express');
const sequelize = require('./config/database');
require('dotenv').config();

const app = express();
app.use(express.json());

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/posts', require('./routes/posts'));

// Sync DB
sequelize
  .sync({ alter: true })
  .then(() => console.log('Database connected & tables synced'))
  .catch((err) => console.error('DB Error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
