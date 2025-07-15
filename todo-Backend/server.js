const express = require('express');

const mongoose = require('mongoose');


const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

//let todos = [];

mongoose.connect('mongodb://localhost:27017/todoDB')
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.error('Failed to connect to MongoDB', err); 
});


const todoSchema = new mongoose.Schema({
  title: {
    required : true,
    type: String,
  },
  description: String
});


const todoModel = mongoose.model('Todo', todoSchema);

app.post('/todos',async (req, res) => {
  const { title, description } = req.body;
  try {
    const newTodo=new todoModel({ title, description });
    await newTodo.save();
    res.status(201).json(newTodo);
    }
    catch(error){
      console.error('Error saving todo:', error);
      res.status(500).json({message : error.message});

  }
  
  
  res.status(201).json(newTodo);
});


app.get('/todos',async (req, res) => {
  try{
    const todos=await todoModel.find();
    res.json(todos);
  }
  catch(error){
    console.error('Error fetching todos:', error);
    res.status(500).json({message : error.message});
  }

});

//update todo item
app.put("/todos/:id", async (req,res) => {
  try{
    const {title, description} = req.body;
  const id =req.params.id;
  const updatedTodo = await todoModel.findByIdAndUpdate(
    id, 
    {title, description}, 
    {new : true}
    
  )
  if(!updatedTodo){
    return res.status(404).json({message: "Todo not found"});
  }
  res.json(UpdatedTodo)

  }catch(error){
    console.error('Error updating todo:', error);
    res.status(500).json({message : error.message});

  }
  
})
//delete todo item
app.delete('/todos/:id', async (req, res) => {
  try{
    const id = req.params.id;
    await todoModel.findByIdAndDelete(id);
    res.status(204).send(); // No content to send back
  } catch(error){
    console.error('Error deleting todo:', error);
    res.status(500).json({message : error.message});
  }
});






app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
