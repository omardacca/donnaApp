const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const moment = require('moment');
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const models = require('../models');
const twillio = require('./twillio');
const CacheManager = require('./Classes/CacheManager');


const Users = require('./Classes/Users');


app.get('/', (req, res) => res.send('Hello World!'))
app.get('/hello', async (req, res) => {
    
    const response = await Users.getUserExpensesStatus({ phoneNumber: 17, dateOfMonth: new moment() });
    
    return res.send(response);
});

app.get('/get', async (req, res) => {

    const response = await CacheManager.get({ key: 'omarAA'});

    const message = `(from cache) value of the keys omar is ${JSON.stringify(response)}`;
    console.log(message);
    
    return res.send(message);
});


app.post('/botcallback', (req, res) => {
    console.log('botcallback called');
    return res.send('success');
})

app.get('/send', async (req, res) => {
    const results = await twillio.sendMessage('Hello from node');

    if(results) {
        return res.send(`message sent successfully, ${results}`);
    }
    return res.status(200).send('error occured');
})

app.post('/incoming', async (req, res) => {
    console.log(`Body: ${req.body.Body}`);

    const [record, created] = await Users.findOrCreateUser(req.body.From);
    if(!record) {
        return res.send(`Oops.. Something went wrong`);
    }

    let results;

    if(created) {
        const messageText = `
        مرحبا بك في تشات بوت دونا،
        الرجاء ارسال رقم العمليه المطلوبه:
        1. تسجيل مصروفات جديده
        2. عرض البيانات الماليه المتراكمه
        3. الخروج`
        results = await twillio.sendMessage(messageText, req.body.From);
    } else {
        const userState = await CacheManager.get(record.From);
        
    }

    if(results) {
        return res.send(`message sent successfully, ${results}`);
    }
    return res.send('error occured');
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

models.sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
})
.catch((error) => {
    console.error('Unable to connect to the database:', error);
});