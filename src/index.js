const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const users = {}; // O(1)

function checksExistsUserAccount(request, response, next) {
  // Complete aqui
}

app.post('/users', (request, response) => {
  const { name, username } = request.body;

  const uuid = uuidv4();

  users[uuid] = { 
    name, 
    username, 
    todos: [], 
    id: uuidv4() 
  };

  response.status(201).json({ uuid, message: "Usuário criado °˖✧◝(⁰▿⁰)◜✧˖°"});
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port} <(￣︶￣)>`)
})

module.exports = app;