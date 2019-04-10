const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex');
const cors = require('cors');
const pg = require('pg');
const app = express();
const spendings = require('./controlers/Spendings');
const categories = require('./controlers/Categories');
const profile = require('./controlers/Profile');
const accounts = require('./controlers/Accounts');

const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'susan',
        password : 'test',
        database : 'spendings'
    }
});

app.use(bodyParser.json());
app.use(cors());

app.get('/spendings', spendings.getSpendings(db));
app.get('/spendings/:id', spendings.getSpending(db));
app.post('/spendings', spendings.addSpending(db));
app.delete('/spendings/:id', spendings.deleteSpending(db));
app.put('/spendings/:id', spendings.updateSpending(db));

app.get('/categories', categories.getCategories(db));
app.get('/profile/:id', profile.getProfile(db));
app.get('/columns', spendings.getColumns(db));

app.get('/accounts', accounts.getAccounts(db));
app.post('/accounts', accounts.addAccount(db));
app.delete('/accounts/:id', accounts.deleteAccount(db));
app.put('/accounts/:id', accounts.updateAccount(db));

app.listen(3001 || process.env.PORT, ()=>{
    console.log(`app is running on port  ${process.env.PORT}`);
})