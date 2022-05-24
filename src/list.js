import React from 'react'
import './List.css';


function List({items,removeTodo,editTodo}) {
  return (
    <div>
        {items.map(item=>{
            const {id,title} = item;
           return( 
           <article className="todo-list" key={id}>
                <p className='todo-item'>{title}</p>
                <button onClick={()=>editTodo(id)}>edit</button>
                <button onClick={()=>removeTodo(id)}>delete</button>
            </article>
            )
        })}
    </div>
  )
}

export default List;