import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { faTrash } from "@fortawesome/free-solid-svg-icons"

function Todo({task, toggleCoplate, deleteTodo}) {
   return (
      <div className="todo">
         <p onClick={() => toggleCoplate(task)} className={`${task.completed ? `complated` : ""} taskPara`}>{task.text}</p>
         <div className="icons">
            <FontAwesomeIcon className="icon icon-delete" onClick={() => deleteTodo(task.id)} icon={faTrash} />
         </div>
      </div>
   );
};

export default Todo;