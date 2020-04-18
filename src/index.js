const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const generalApi = require('./api/generalApi');
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const models = require('../models');



app.get('/', (req, res) => res.send('Hello World!'))
app.get('/hello', async (req, res) => {

    const results = await generalApi.getAllUsers(req, res);
    
    return res.send(results);
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

models.sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
})
.catch((error) => {
    console.error('Unable to connect to the database:', error);
});