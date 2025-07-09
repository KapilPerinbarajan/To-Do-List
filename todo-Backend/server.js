const express = require('express');
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

let todos = [];

app.post('/todos', (req, res) => {
  const { title, description } = req.body;

  const newTodo = {
    id: todos.length + 1,
    title,
    description
  };

  todos.push(newTodo);
  console.log(todos);
  res.status(201).json(newTodo);
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
