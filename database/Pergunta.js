const Sequelize = require('sequelize'); // Inicia sequelize
const connection = require('./database'); // Importa as informações do BD

// Define a estrutura da tabela no dB
const Pergunta = connection.define('pergunta', {
  titulo: { // Campo que será criado
    type: Sequelize.STRING, // tipo para texto curto
    allowNull: false // Nao permite valores em branco
  },
  descricao: { // Campo que será criado
    type: Sequelize.TEXT,
    allowNull: false
  }
});

// Sincroniza o arquivo com o BD
Pergunta.sync({ force: false }) // Força a criação da tabela caso já exita
  .then(() => {
    console.log("Tabela criada com sucesso!");
  });

// Exporta o model para o index.js
module.exports = Pergunta;
