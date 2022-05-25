import { useState,useEffect} from 'react';
// import './App.css';
import Alert from './alert';
import List from './list';

const getLocalStorage = () =>{
  let list = localStorage.getItem('list');
  if(list){
    return JSON.parse(localStorage.getItem('list'));
  }else{
    return [];
  }
}

function App() {
  const [todo,setTodo]=useState('');
  const [todoList,setTodoList]=useState(getLocalStorage());
  const [isEditing,setIsEditing]=useState(false);
  const [editID, setEditID]=useState(null);
  const [alert,setAlert]=useState({show:false,msg:'',type:''});

  const submitForm =(e)=>{
    e.preventDefault();
    if(!todo){
      showAlert(true,"Please enter task","success");
    }else if(todo && isEditing){
      setTodoList(todoList.map(item=>{
        if(item.id === editID){
          return {...item,title:todo}
        }
        return item;
      })
      )
      setTodo('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true,'Task Modified' , 'success' )
    }else{
      showAlert(true,'Task added' , 'success');
      const newTodo={id:new Date().getTime().toString() , title:todo};
      setTodoList([...todoList,newTodo]);
      setTodo('');
    }
  }

  const showAlert=(show=false,msg='',type='')=>{
      setAlert({show,msg,type});
  }

  const clearList=()=>{
    showAlert(true,'emptyList','danger');
    setTodoList([]);
  }

  const removeTodo=(id)=>{
    showAlert(true,'task removed' , 'danger');
    setTodoList(todoList.filter((item)=> item.id !== id)); 
  }

  const editTodo=(id)=>{
    const specificTodo=todoList.find((item)=>item.id == id);
    setIsEditing(true);
    setEditID(id);
    setTodo(specificTodo.title);
  }

  useEffect (()=>{
    localStorage.setItem('list' , JSON.stringify(todoList));
  },[todoList])

  return (
  
    <section className="section-center">

      <form className='grocery-form' onSubmit={submitForm}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} todoList={todoList} />}
        <h3>make your todo</h3>
        <div className='form-control'>
          <input type="text" className='task' value={todo } onChange={(e)=>setTodo(e.target.value)}/>
          <button type="submit" className='submit-btn' onClick={submitForm}>{isEditing ? "edit" :" Add task" }
          </button>
        </div>  
      </form>
      {todoList.length > 0 && 
      <div className='todo-container'>
        <List items={todoList} removeTodo={removeTodo} editTodo={editTodo} />
        <button className='clear-btn' onClick={clearList}>ClearAll</button>
      </div>
      }
      
    </section>

  
  
  );
}

export default App;
