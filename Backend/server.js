require('./config/db.js');
const express = require('express');
const app = express();
const UserRouter = require('./api/User.js');

// const bodyParser = require('express').json;
// app.use(bodyParser());

app.use('/user',UserRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
