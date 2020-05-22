const express= require('express');
const bodyParser= require('body-parser');
const validator= require('express-validator');
const cors= require('cors');
const fileUpload= require('express-fileupload');

const urlConfig= require('./url')
const access= require('./token');

module.exports= function() {
	var app= express();
	app.set('view engine','ejs');
	app.set('views','./app/views');
	app.engine('html', require('ejs').renderFile);
	app.use(bodyParser.json({limit: '50mb'}));
	app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
	app.use(validator());
	app.use(cors());
	app.use(fileUpload());

	app.use(function(req, res, next){
		res.header("Access-Control-Allow-Origin", `${urlConfig.URL}`);
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-CSRF-Token, X-File-Name");
		if(!access.token(req.headers['x-access-token'])){
			res.sendStatus(401)
			return 
		}
		next();
	})
	
	return app;
}
