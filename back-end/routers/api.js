const express = require('express');
var app = express();

const accessesRoutes = require('./accessesRoutes');
const rolesRoutes = require('./rolesRoutes');
const authRoutes = require('./authRoutes');

app.use('/access', accessesRoutes);
app.use('/role', rolesRoutes);
app.use('/auth', authRoutes);

module.exports = app;
