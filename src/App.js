import './App.css';
import axios from 'axios';
import React,{useState,useEffect} from 'react'

const App =()=>{
  const [ todos, settodos]=useState([]);
  const [task,settask]=useState('');

  useEffect(()=>{
    axios.get('http://localhost:5000/todos').then((res)=>{
      settodos(res.data);
    });
  },[]);

  const addTodo=()=>{
    axios.post('http:localhost:5000/todos',{task}).then((res)=>{
      settodos([...todos,res.data]);
      settask('');
    });
  };
   const deleteTodo=(id)=>{
    axios.delete('http:localhost:5000/todos/${id}').then(()=>{
      settodos(todos.filter((t)=>t._id !==id));
    });
   };

   const toggleComplete=(id)=>{
    const todo=todos.find((t)=>t._id==id);
    axios.put('http://localhost:5000/todo/${id}',{
      completed: !todo.completed,
    }).then((res)=>{
      setTodos(todos.map((t)=>(t._id===id?res.data:t)));
    })
   };
  return (
    <div>
      <h1>To do app</h1>
     <input type='text' value={task} onChange={(e)=>settask(e.target.value)}
     />
     <button onClick={addTodo}>Add</button>
     <ul>
      {todo.map((todo)=>{
        <li key={todo._id}>
          <span style={{textDecoration:todo.completed ? 'line-through':''}}
          onClick={()=>toggleComplete(todo._id)}>
            {todo.task}

          </span>
          <button onClick={()=> deleteTodo(todo._id)}>Delete</button>

        </li>
      })}
     </ul>
    </div>
  );
};

export default App;
