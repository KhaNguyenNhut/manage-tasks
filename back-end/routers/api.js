const express = require('express');
var app = express();

const categoriesRoutes = require('./categoriesRoutes');
const foodsRoutes = require('./foodsRoutes');
const tablesRoutes = require('./tablesRoutes');
const ordersRoutes = require('./ordersRoutes');
const billsRoutes = require('./billsRoutes');
const accessesRoutes = require('./accessesRoutes');
const rolesRoutes = require('./rolesRoutes');
const authRoutes = require('./authRoutes');
const feedbackRoutes = require('./feedbackRoutes');
const ingredientsRoutes = require('./ingredientsRoutes');
const storagesRoutes = require('./storagesRoutes');

app.use('/category', categoriesRoutes);
app.use('/food', foodsRoutes);
app.use('/table', tablesRoutes);
app.use('/order', ordersRoutes);
app.use('/bill', billsRoutes);
app.use('/access', accessesRoutes);
app.use('/role', rolesRoutes);
app.use('/auth', authRoutes);
app.use('/feedback', feedbackRoutes);
app.use('/ingredient', ingredientsRoutes);
app.use('/storage', storagesRoutes);

module.exports = app;
