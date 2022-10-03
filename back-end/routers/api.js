const express = require('express');
var app = express();

const accessesRoutes = require('./accessesRoutes');
const rolesRoutes = require('./rolesRoutes');
const authRoutes = require('./authRoutes');
const usersRoutes = require('./usersRoutes');

app.use('/access', accessesRoutes);
app.use('/role', rolesRoutes);
app.use('/auth', authRoutes);
app.use('/user', usersRoutes);

module.exports = app;
