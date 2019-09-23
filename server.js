// grab the packages we need
var express = require('express');
var app = express();
var port = process.env.PORT || 3214;
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

var operadoras = [
    {nome: "Oi", codigo: 14, categoria: "Celular", preco: 2},
    {nome: "Vivo", codigo: 15, categoria: "Celular", preco: 1},
    {nome: "Tim", codigo: 41, categoria: "Celular", preco: 3}
  ];
  
  var contatos = [
    {id: 1, nome: "Bruno", telefone: "9999-2222", data: new Date(), operadora: operadoras[0]},
    {id: 2, nome: "Sandra", telefone: "9999-3333", data: new Date(), operadora: operadoras[1]},
    {id: 3, nome: "Mariana", telefone: "9999-9999", data: new Date(), operadora: operadoras[2]}
  ];

// routes will go here

app.get('/operadoras', function (req, res) {
    res.write(JSON.stringify(operadoras));
    res.end();
});

app.get('/contatos', function (req, res) {
    try{
        res.write(JSON.stringify(contatos));
        res.end();
    }catch(e){
        res.status(404).send('Not found');
        
    }

});

app.get('/contato/:id', function (req, res) {
    try{
        res.write(JSON.stringify(contatos[req.params.id]));
        res.end();
    }catch(e){
        res.status(404).send('Not found');
        
    }
});

app.post('/contatos', function (req, res) {
    var contato = req.body;
    ///console.log(contato);
    contatos.push(contato);
    res.end();
});


app.get('/api/:version', function(req, res) {
    res.send(req.params.version);
  });

// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);