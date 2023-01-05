const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const connection = require('./database/database');
const perguntaModel = require('./database/Pergunta');

connection
  .authenticate()
  .then(() => {
    console.log("Conexão estabelecida com sucesso!")
  })
  .catch((error) => {
    console.log(error)
  })

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render("index");
})

app.get('/ask', (req, res) => {
  res.render('perguntar');
  const titulo = req.body.titulo;
  const descricao = req.body.descricao;

  res.send("Formulário recebido" + titulo + descricao);
});

app.post('/salvarpergunta', (req, res) => {
})

app.listen(4000, error => {
  if (error) console.log("Ops, algo deu errado!")
  else console.log("Servidor Iniciado com Sucesso!");
})
