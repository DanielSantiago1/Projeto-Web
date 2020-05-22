const app= require('./config/express')();
const morgan= require('morgan');
//Configurações para o Banco de Dados
const dbConfig= require('./config/database');
const sessionConfig= require('./config/session');

const PORT= process.env.PORT || 8081

const session= require('express-session');
const MySQLStore= require('express-mysql-session')(session);

const con= new MySQLStore(dbConfig);

app.use(morgan('dev'));

app.use(session(sessionConfig));

// CONFIGURAR ROTAS
const registros= require('./routes/registros')(app, con);
const usuarios= require('./routes/usuarios')(app, con);
const alunos= require('./routes/alunos')(app, con);

const http= require('http').Server(app);

http.listen(PORT, function(){
	console.log('API has running');
})