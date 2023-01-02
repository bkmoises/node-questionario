const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render("index");
})

app.get('/ask', (req, res) => {
  res.render('perguntar');
});

app.listen(4000, error => {
  if (error) console.log("Ops, algo deu errado!")
  else console.log("Servidor Iniciado com Sucesso!");
})
