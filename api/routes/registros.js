module.exports= function(app, con){

	//CRIAR NOVO USUARIO
	app.post('/registerUser',function(req, res){
		const body = [req.body.name_user, req.body.email_user, req.body.birthday_user, req.body.password_user];
		const sql = `INSERT INTO 
					usuarios (nome, email, data_nascimento, senha) 
					VALUES (?,?,?,?)`;
		
		con.query(sql, body, function(err, result) {
			if(err){
				res.send([res.statusCode]);
			}else{
				res.send([res.statusCode, result]);
			}
		})
	})
	
	//AUTENTICAR USUÁRIO NO SISTEMA
	app.post('/logon',function(req, res){
		const body = [req.body.email_user, req.body.password_user];
		const sql= `SELECT u.id_usuario, u.nome, u.email, u.data_nascimento 
					FROM usuarios AS u 
					WHERE u.email = ? AND u.senha = ?`;
		
		con.query(sql, body, function (err, result, fields) {			
			if(err){
				res.send([res.statusCode, result]);
			}else{
				if (result[0] != undefined){
					const token = jwt.sign({ id: result.id_usuario}, authConfig.secret, {
						expiresIn: 86400,
					});
				res.send([res.statusCode, [result[0].id_usuario, result[0].nome, result[0].email, result[0].data_nascimento, token]])
				}
				else {
					res.send([res.statusCode, result]);
				}
			}
		})
	})

	//LISTAR USUARIOS CADASTRADOS NO SISTEMA
	app.post('/list_Users',function(req, res){
		const sql= 'SELECT * FROM usuarios AS u WHERE u.nome = ?';
		con.query(sql, [req.body.name_user], function (err, result) {			
			if(err){
				res.send(["500", []]);
				console.log("/list_Users 500");
			}else{
				res.send(["200", result]);
				console.log("/list_Users 200");
			}
		})
	})

	app.post('/list_Email',function(req, res){
		const body = [req.body.email_user];
		const sql= 'SELECT * FROM usuarios AS u WHERE u.email = ?;';
		con.query(sql, body, function(err, result){
			if(err){
				res.send(["500",[]]);
				console.log("/list_Email 500");
			} else {
				res.send(["200", result]);
				console.log("/list_Email 200");
			}
		})
	})

	// app.delete('/login/:id', function(req, res){
	// 	const sql = 'DELETE FROM usuario WHERE id = ?'
	
	// 	con.query(sql, [req.params.id], function(err, result){
	// 		if (err){
	// 			res.send(["404", []])
	// 			console.log("/login/:id 404");
	// 		}else{
	// 			res.send(["200", result]);
	// 			console.log("/login/:id 200");
	// 		}
	// 	});
	// })

}
