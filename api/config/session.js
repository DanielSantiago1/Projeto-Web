const session= require('express-session');
const MySQLStore= require('express-mysql-session')(session);

const dbConfig= require('./database');
const con= new MySQLStore(dbConfig);

module.exports = {
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: con,
    resave: false,
    saveUninitialized: false
}