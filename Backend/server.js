const express = require('express');
const mongoose=require('mongoose');
const cors = require('cors');

require('dotenv').config();


const app = express();
const PORT=process.env.PORT || 50000;

app.use(cors());
app.use(express.json());

// mongoose.connect(process.env.//localhost:27017/TODO_APP,{
// userNewUrlParser:true,
// useUnifiesTopology:true,
// });

const todoSchema = new mongoose.schema({
    task:Strinng,
    completed:Boolean,
});

const Todo = mongoose.model('Todo',todoSchema);
app.get('/todos',async(req,res)=>{
    const todos = await Todo.find();
    res.json(todos);
});

app.post('/todos',async(req,res)=>{
    const todo= new Todo({
        task:req.body.task,
        completed:false,
    });
    await newTodo.save();
    res.json(newTodo);
});

app.put('./todos/:id',async (req,res)=>{
    const {id}=req.params;
    const updatedTodo = await Todo.findByIdAndUpdate(
        id,{
            completed:req.body.completed
        },
        {
            new:true
        }
    );
    res.json(updatedTodo);
});

app.delete('/todos/:id',async(req,resp)=>{
    const {id}=req.param;
    await Todo.findByIdAndDelete(id);
    res.json({message:'Todo deleted'})
;});

app.listen(PORT,()=>{
    console.log('MULTIPLIER SURVER RUNNING');
})