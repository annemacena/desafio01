const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
// const port = 3000;

app.use(cors());
app.use(express.json());

const users = {}; // O(1)

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;

  const user = users[username];

  if(user) {
    request.user = user;
    return next();
  }
  else {
    return response.status(404).json({ error: "Usuário inválido (￢_￢)" });
  }
}

app.post('/users', (request, response) => {
  const { name, username } = request.body;

  const user = users[username];
  
  if(!user) {
      users[username] = { 
        name, 
        username, 
        todos: [], 
        id: uuidv4() 
      };
    
      response.status(201).json(users[username]);
    }
  else {
    return response.status(400).json({ error: "Usuário já existe (¯.¯٥)" });
  }
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  const { user } = request;

  return response.status(200).json(user.todos);
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const { title, deadline } = request.body;

  const newToDo = { 
    id: uuidv4(),
    title,
    done: false, 
    deadline: new Date(deadline), 
    created_at: new Date()
  };

  user.todos.push(newToDo);

  response.status(201).json(newToDo);
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const { id } = request.params;
  const { title, deadline } = request.body;

  const todo = user.todos.find((todo) => todo.id === id);

  if(todo) {
    todo.deadline = new Date(deadline);
    todo.title = title;
    response.status(200).json(todo);
  }
  else {
    return response.status(404).json({ error: "To-do não existe (¯.¯٥)" });
  }
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const { id } = request.params;

  const todo = user.todos.find((todo) => todo.id === id);
  
  if(todo) {
    todo.done = true;
    response.status(200).json(todo);
  }
  else {
    return response.status(404).json({ error: "To-do não existe (¯.¯٥)" });
  }
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const { id } = request.params;

  const todoIndex = user.todos.findIndex((todo) => todo.id === id);

  if(todoIndex >= 0) {
    user.todos.splice(todoIndex, 1);
    response.sendStatus(204);
  }
  else {
    return response.status(404).json({ error: "To-do não existe (¯.¯٥)" });
  }
});

// app.listen(port, () => {
//   console.log(`Servidor rodando na porta ${port} <(￣︶￣)>`)
// })

module.exports = app;