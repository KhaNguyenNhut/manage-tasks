const express = require('express');
var app = express();

const accessesRoutes = require('./accessesRoutes');
const rolesRoutes = require('./rolesRoutes');
const authRoutes = require('./authRoutes');
const usersRoutes = require('./usersRoutes');
const taskTypesRoutes = require('./taskTypesRoutes');
const tasksRoutes = require('./tasksRoutes');
const discussionsRoutes = require('./discussionsRoutes');
const subtasksRoutes = require('./subtasksRoutes');

app.use('/access', accessesRoutes);
app.use('/role', rolesRoutes);
app.use('/auth', authRoutes);
app.use('/user', usersRoutes);
app.use('/taskType', taskTypesRoutes);
app.use('/task', tasksRoutes);
app.use('/discussion', discussionsRoutes);
app.use('/subtask', subtasksRoutes);

module.exports = app;
