require('dotenv').config();
const express = require('express');
const connectToDB = require('./database/db');
const ErrorsMiddleware = require('./middleware/errorMiddleware');
const MiniProjetError = require('./utils/MiniProjetError');
const userRoutes = require('./routes/userRoutes');
const photoRoutes = require('./routes/photoRoutes');

process.on('uncaughtException', (error) => {
  console.log('Uncaught Exception..... 💣 🔥 stopping the server....');
  console.log(error.name, error.message);

  process.exit(1);
});

//Initialize the app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToDB();

const PORT = process.env.PORT || 5000;

//Mount/Create Routes
app.get('/test', (req, res) => {
  res.json({
    Hi: 'Welcome to the Mini-project API',
  });
});
app.use('/api/v1/', userRoutes, photoRoutes);

app.use('/uploads', express.static('uploads'));

// Error middleware
app.all('*', (req, res, next) => {
  next(new MiniProjetError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(ErrorsMiddleware);

// Make the sever listen on the declared PORT variable
const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`),
);

// Unhandled Rejection
process.on('unhandledRejection', (error) => {
  console.log('Unhandled Rejection..... 💣 🔥 stopping the server....');
  console.log(error.name, error.message);
  server.close(() => {
    // exit code 1 means that there is an issue that caused the program to exit
    process.exit(1);
  });
});
