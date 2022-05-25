import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';



function List({items,removeTodo,editTodo}) {
  return (
    <div>
        {items.map(item=>{
            const {id,title} = item;
           return( 
           <article className="todo-list" key={id}>
                <p className='title'>{title}</p>
                <div className='btn-container'>
                <button 
                type='button' className='edit-btn'
                onClick={()=>editTodo(id)}><FaEdit /></button>
                <button 
                type="button" className='delete-btn'
                onClick={()=>removeTodo(id)}><FaTrash /></button>
                </div>
            </article>
            )
        })}
    </div>
  )
}

export default List;