import {useState} from "react"

function TaskInput({onAdd}: {onAdd: (text: string) => void}){
  const[text, addText] = useState('')
  return(
	<div> 
	  <input
	    value={text}
	    onChange={(e) => addText(e.target.value)}
	  /> 
	  <button onClick={() => onAdd(text)}>Нажми</button>
	</div> 
  )
}
export default TaskInput