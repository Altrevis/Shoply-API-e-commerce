const express = require('express');
const app = express();
const routes = require('./routes/index');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// if routes is an express.Router()
app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});