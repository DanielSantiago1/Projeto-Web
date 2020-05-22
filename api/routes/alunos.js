module.exports = function (app, con) {

	//CRIAR NOVO USUARIO
	app.post('/criarAluno', function (req, res) {
		const bodyEndereco = [req.body.cep, req.body.rua, req.body.bairro, req.body.estado, req.body.cidade, req.body.complemento];
		const bodyTelefone = [req.body.telefone, req.body.celular];

		const sqlAluno = `INSERT INTO aluno (id_telefone, id_endereco, nome, email, cpf, data_nascimento, sexo, responsavel, faixa_etaria, etnia, descricao) VALUES (?,?,?,?,?,?,?,?,?,?,?)`;
		const sqlEndereco = `INSERT INTO endereco (cep, logradouro, bairro, estado, cidade, complemento) VALUES (?,?,?,?,?,?)`;
		const sqlTelefone = `INSERT INTO telefone (telefone, celular) VALUES (?,?)`;

		//Inserir dados do telefone
		con.query(sqlTelefone, bodyTelefone, function (err, result) {
			if (err) {
				res.send([res.statusCode]);
			} else {
				let id_telefone = result.insertId;
				
				//Inserir dados do endereço
				con.query(sqlEndereco, bodyEndereco, function (err, result) {
					if (err) {
						res.send([res.statusCode]);
					} else {
						let id_endereco = result.insertId;

						//Query Aluno
						const bodyAluno = [id_telefone, id_endereco, req.body.nome, req.body.email, req.body.cpf, req.body.dataNascimento, req.body.sexo ,req.body.responsavel, req.body.faixaEtaria, req.body.etnia, req.body.descricao];
						con.query(sqlAluno, bodyAluno, function (err, result) {
							if (err) {
								res.send([res.statusCode]);
							} else {
								res.send([res.statusCode, result.affectedRows]);
							}
						})
					}
				})
			}
		})		
	})

	app.delete('/deletarAluno', function (req, res) {
		const body = [req.body.email, req.body.senha];
		const sql = `DELETE FROM aluno WHERE id_aluno = ?`;
		
		con.query(sql, body, function (err, result) {
			if (err) {
				res.send([res.statusCode])
			} else {
				res.send([res.statusCode, result])
			}
		})
	})

		

}
