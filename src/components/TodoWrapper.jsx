import React, { useState, useEffect} from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo'
// Firebase - database
import {db} from '../firebase'
import { query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc } from 'firebase/firestore'


function TodoWrapper() {
   const [todos, setTodos] = useState([])


   // Create todo
   const createTodo = async (todo) => {
      await addDoc(collection(db, 'todo-app'), {
         text: todo,
         completed: false,
         isUpdated: false
      })
   }

   // Read todo from Firebase
   useEffect(()=> {
      const q = query(collection(db, 'todo-app'))
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
         let todosArr = [];
         querySnapshot.forEach((doc) => {
            todosArr.push({...doc.data(), id: doc.id})
         })

         setTodos(todosArr);
      })
      return () => unsubscribe()
   }, [])

   // Update todo in Firebase
   const toggleCoplate = async (task) => {
      await updateDoc(doc(db, 'todo-app', task.id), {
         completed: !task.completed,

      })
   }

   // Delete todo
   const deleteTodo = async (id) => {
      await deleteDoc(doc(db, 'todo-app', id))
   }



   return (
      <div className='todo-wrapper'>
         <h1 className='title'>Get Things Done!</h1>
         <TodoForm createTodo={createTodo} />

         {todos.map((task, index) => {
            return <Todo key={index} task={task} toggleCoplate={toggleCoplate} deleteTodo={deleteTodo} />
         })}

         {todos.length === 0 ? null :
            <p className='todo-count'>
               You have {todos.length} {todos.length === 1 ? 'todo' : 'todos'}.
            </p>
         }
      </div>
   );
};

export default TodoWrapper