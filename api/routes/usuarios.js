module.exports = function (app, con) {

	//CRIAR NOVO USUARIO
	app.post('/criarUsuario', function (req, res) {
		const body = [req.body.nome, req.body.email, req.body.senha, req.body.perfil];
		const sql = `INSERT INTO usuario (nome, email, senha, perfil) VALUES (?,?,?,?)`;
		
		con.query(sql, body, function (err, result) {
			if (err) {
				console.log(err);
				res.send([res.statusCode]);
			} else {
				console.log(result);
				res.send([res.statusCode, result.affectedRows]);
			}
		})
	})

	//AUTENTICAR USUÁRIO NO SISTEMA
	app.post('/logon', function (req, res) {
		const body = [req.body.email, req.body.senha];
		const sql = `SELECT u.id_usuario, u.nome, u.email, u.perfil FROM usuario AS u WHERE u.email = ? AND u.senha = ?`;

		con.query(sql, body, function (err, result, fields) {
			if (err) {
				res.send([res.statusCode, result]);
			} else {
				if (result[0] != undefined) {
					const token = jwt.sign({ id: result.id_usuario }, authConfig.secret, {
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
	app.post('/selecionarUsuarios', function (req, res) {
		const body = [req.body.name_user];
		const sql = `SELECT u.id_usuario, u.email, u.nome, u.perfil FROM usuario AS u`;
		
		con.query(sql, body, function (err, result) {
			if (err) {
				res.send([res.statusCode])
			} else {
				res.send([res.statusCode, result])
			}
		})
	})

	app.post('/selecionarEmail', function (req, res) {
		const body = [req.body.email_user];
		const sql = `SELECT u.email FROM usuario AS u WHERE u.email = ?`;
		
		con.query(sql, body, function (err, result) {
			if (err) {
				res.send([res.statusCode])
			} else {
				res.send([res.statusCode, result])
			}
		})
	})

	app.post('/selecionarUsuario', function (req, res) {
		const body = [req.body.email, req.body.senha];
		const sql = `SELECT u.nome, u.email, u.perfil FROM usuario AS u WHERE u.email = ? AND u.senha = ?`;
		
		con.query(sql, body, function (err, result) {
			if (err) {
				res.send([res.statusCode])
			} else {
				res.send([res.statusCode, result])
			}
		})
	})

	app.put('/atualizaUsuario', function (req, res) {
		const body = [req.body.senha];
		const sql = `UPDATE usuario SET senha = ?`;
		
		con.query(sql, body, function (err, result) {
			if (err) {
				res.send([res.statusCode])
			} else {
				res.send([res.statusCode, result])
			}
		})
	})

	app.delete('/deletarUsuario', function (req, res) {
		const body = [req.body.id_usuario];
		const sql = `DELETE FROM usuario WHERE id_usuario = ?`;
		
		con.query(sql, body, function (err, result) {
			if (err) {
				res.send([res.statusCode])
			} else {
				res.send([res.statusCode, result])
			}
		})
	})

}
