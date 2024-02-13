import React, { useState } from "react";

function TodoForm({ createTodo }) {
   const [value, setValue] = useState(''); 
   
   const handleChange = (e) => {
      setValue(e.target.value);
   }

   const handleSubmit = (e) => {
      e.preventDefault();

      if(value.trim() === ''){
         window.alert('Please input a task!');
      }else{
         createTodo(value);
      }
      setValue('');
   };

   return (
      <form onSubmit={handleSubmit} className="todo-form">
         <input onChange={handleChange} value={value} type="text" className="todo-input" placeholder="What is the tast today?" />
         <button type="submit" className="todo-btn">Add Task</button>
      </form>
   );
};

export default TodoForm;