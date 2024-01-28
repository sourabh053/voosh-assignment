import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetTask } from "../../redux/tasksSlice";

function CreateTask() {
  const [inputs, setInputs] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    dispatch(SetTask({ ...inputs, status: "TO-DO" }));
    navigate("/");
  };
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
          Create Task
        </Button>
      </form>
    </div>
  );
}

export default CreateTask;
