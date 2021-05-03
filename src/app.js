const express = require('express');
const indexRouter = require('./routes/index');
const cors = require('cors');
const app = express();
const handleExpressErrors = require('./lib/utils/handleExpressErrors');
const objectionSetup = require('./objection');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(indexRouter);

app.use(handleExpressErrors);

objectionSetup(app);

module.exports = app;
