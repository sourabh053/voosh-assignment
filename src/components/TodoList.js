import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetallTask,DeleteTask, UpdateStatus } from "../redux/allTasksSlice";
import { SetTask } from "../redux/tasksSlice";

function TodoList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { allTasks } = useSelector((state) => state.allTasks);
  const { task } = useSelector((state) => state.tasks);
  const handleClick = () => {
    navigate("/create-task");
  };
  const handleDelete = (e)=>{
    const title = e.currentTarget.children[0].children[0].innerText;
    if(e.target.tagName === 'BUTTON' && e.target.innerText === "DELETE"){
        dispatch(DeleteTask(title));
        return;
    }
    if(e.target.tagName === 'BUTTON' && e.target.innerText === "EDIT"){
        localStorage.setItem("title",title);
        navigate('/edit-task');
        return;
    }
    if(e.target.tagName === 'INPUT'){
        let count = 0;
        const pchilds = e.currentTarget.children[0].children;
        for(let i=1;i<pchilds.length; i++){
            if(pchilds[i].children[0].children[0].checked){
                count++;
            }
        }
        // console.log(count);
        dispatch(UpdateStatus({'title': title,'count':count}));
        return;
    }
  }

  useEffect(() => {
    if (task !== null) {
        //console.log(task);
        //console.log(allTasks);
      dispatch(SetallTask(task));
      dispatch(SetTask(null));
    }

    // eslint-disable-next-line
  }, []);
  return (
    <div className="list-container">
      <Button variant="contained" onClick={handleClick}>
        Create Task
      </Button>
      {allTasks.map((task,index) => (
        <div key={index} className="allTasks-cont" onClick={handleDelete}>
          <div>
            <h4>{task.title}</h4>
            <p>{task.subtaskone}
            <Checkbox />
            </p>
            <p>{task.subtasktwo}
            <Checkbox  />
            </p>
            <p>{task.subtaskthree}
            <Checkbox  />
            </p>
          </div>
          <div>
            <h4>status</h4>
            <p>{task.status}</p>
          </div>
          <div>
            <Button variant="outlined" startIcon={<EditIcon />}>
              Edit
            </Button>
            <Button variant="outlined" startIcon={<DeleteIcon />}  style={{marginLeft: "5px"}}>
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TodoList;
