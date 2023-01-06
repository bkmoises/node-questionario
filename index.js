const bodyParser = require('body-parser');
const express = require('express');
const app = express();

// DB Connect
const connection = require('./database/database');

// Models
const Pergunta = require('./database/Pergunta');
const Resposta = require('./database/Resposta');

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

// Select all no DB // raw: Dado cru
// informaçoes serão disparadas aoa acessar a pagina
app.get('/', (req, res) => {
  Pergunta.findAll({
    raw: true, order: [
      ['id', 'DESC'] // order by
    ]
  }).then(pergunta => {
    res.render('index', {
      perguntas: pergunta
    });
  });

});

app.get('/asks', (req, res) => {
  res.render('perguntas');
  const titulo = req.body.titulo;
  const descricao = req.body.descricao;

  res.send("Formulário recebido" + titulo + descricao);
});

app.post('/salvarpergunta', (req, res) => {
  const titulo = req.body.titulo;
  const descricao = req.body.descricao

  // Função responsavel por incluir um dado no BD
  Pergunta.create({
    titulo: titulo, // inclui no campo titulo a variavel titulo
    descricao: descricao
  }).then(() => {
    res.redirect('/'); // Redireciona o cliente para a página inicial
  });
});

// Rota de perguntas
app.get('/ask/:id', (req, res) => {
  const id = req.params.id;

  Pergunta.findOne({
    where: { id: id }
  }).then(pergunta => {
    if (pergunta) {
      Resposta.findAll({
        where: { perguntaId: pergunta.id }
      }).then(respostas => {
        res.render("pergunta", {
          pergunta: pergunta,
          resposta: respostas
        });
      });
    } else {
      res.redirect('/');
    };
  });
});

app.post('/answer', (req, res) => {
  const corpo = req.body.corpo;
  const perguntaId = req.body.pergunta;
  Resposta.create({
    corpo: corpo,
    perguntaId: perguntaId
  }).then(() => {
    res.redirect(`/ask/${perguntaId}`);
  });
});

app.listen(4000, error => {
  if (error) console.log("Ops, algo deu errado!")
  else console.log("Servidor Iniciado com Sucesso!");
})
