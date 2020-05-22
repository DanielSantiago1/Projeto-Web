module.exports = function(app, con){

    app.post ('/novoProduto',function(req, res){
        const sql = 'INSERT INTO produto (nome_prod, preco_prod, codigo_prod) VALUES (?,?,?);'

        con.query(sql, [req.body.nome_prod, req.body.preco_prod, req.body.codigo_prod], function(err, result){
            if(err){
                res.send(["500", []]);
                console.log("/novoProduto 500");
            } else {
                res.send("200", result);
                console.log("/novoProduto 200");
            }
        });
    });
    
    app.get ('/listaProdutos',function(req, res){
        const sql = 'SELECT * FROM produto;'

        con.query(sql, [], function(err, result){
            if(err){
                res.send("500", []);
                console.log("/listaProdutos 500");
            } else {
                res.send("200", result);
                console.log("/listaProdutos 200");
            }
        })
    })

    app.delete('/removeProduto/:id',function(req, res){
        const sql = 'DELETE FROM produto WHERE id_prod = ?';

        con.query(sql, [req.params.id], function(err, result){
            if (err){
                res.send("500",[]);
                console.log("/removeProduto 500"); 
            } else {
                res.send("200", result);
                console.log("/removeProduto 200");
            }
        })
    })

}