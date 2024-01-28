import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DeleteTask } from "../../redux/allTasksSlice";
import { SetTask } from "../../redux/tasksSlice";

function EditTask() {
  const [inputs, setInputs] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allTasks } = useSelector((state) => state.allTasks);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(inputs);
    if (
      inputs.title === undefined ||
      inputs.subtaskone === undefined ||
      inputs.subtasktwo === undefined ||
      inputs.subtaskthree === undefined
    ) {
      alert("please fill all fileds");
      return;
    }
    dispatch(DeleteTask( localStorage.getItem('title')));
    dispatch(SetTask({ ...inputs, status: "TO-DO" }));
    navigate("/");
  };

  useEffect(()=>{
    const taskToEdit = allTasks.find((task)=> (task.title === localStorage.getItem('title')));
    setInputs(taskToEdit);
    console.log(inputs);
     // eslint-disable-next-line 
  },[])
  return (
    <div className="task-container">
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          style={{ display: "block" }}
          label="Task Title"
          variant="outlined"
          name="title"
          value={inputs.title || ""}
          onChange={handleChange}
        />
        <div className="subtasks-container">
          <TextField
            id="standard-basic"
            style={{ display: "block" }}
            label="Sub task 1"
            variant="standard"
            name="subtaskone"
            value={inputs.subtaskone || ""}
            onChange={handleChange}
          />
        </div>
        <div className="subtasks-container">
          <TextField
            id="standard-basic"
            style={{ display: "block" }}
            label="Sub task 2"
            variant="standard"
            name="subtasktwo"
            value={inputs.subtasktwo || ""}
            onChange={handleChange}
          />
        </div>
        <div className="subtasks-container">
          <TextField
            id="standard-basic"
            style={{ display: "block" }}
            label="Sub task 3"
            variant="standard"
            name="subtaskthree"
            value={inputs.subtaskthree || ""}
            onChange={handleChange}
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          className="form-btn"
          style={{ margin: "15px 45px" }}
        >
          Edit Task
        </Button>
      </form>
    </div>
  );
}

export default EditTask;
