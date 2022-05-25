import React, { useEffect } from 'react'

function Alert({msg,type,removeAlert,todoList}) {
    useEffect(()=>{
        const timeOut = setTimeout(()=>{
            removeAlert();
        },3000)
        return () => clearTimeout(timeOut)
    },[todoList])
  return (
    <div className={`alert alert-${type}`}>{msg}</div>
  )
}

export default Alert;
