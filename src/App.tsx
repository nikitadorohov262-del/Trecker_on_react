import {useState, useEffect} from "react"
import TaskInput from "./TaskInput.tsx"

interface Task{
  id: string, 
  title: string, 
  completed: boolean
}
function App(){
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("task_key");
	if(saved){
	  return JSON.parse(saved);
	}
	return [];
  });
  
  useEffect(() => {
   localStorage.setItem("task_key", JSON.stringify(tasks)) 
  }, [tasks]);

  function addTask(text: string){
    const newTask: Task = {
	  id: crypto.randomUUID(),
	  title: text,
	  completed: false
	}
	setTasks([...tasks, newTask])
  }
  
  function toggleTask(id: string){
    setTasks(
	  tasks.map((task) => {
	    if (task.id === id){
		  return  {...task, completed: !task.completed}
		}
		return task;
	  })
	);
  }
  
  function deleteTask(id: string){
	setTasks(tasks.filter((task) => task.id !== id))
  }
  
  return (
    <div>
      <TaskInput onAdd={addTask} />
	  <ul>
	    {tasks.map((task) => (
	      <li key={task.id}>
		  <input 
		    type="checkbox"
			checked={task.completed}
			onChange={() => toggleTask(task.id)}
		  />
		  {task.title}
		  <button onClick={() => deleteTask(task.id)}>Удалить</button>
		  </li> 
	    ))}
	  </ul>
    </div>
  )
} 
export default App


