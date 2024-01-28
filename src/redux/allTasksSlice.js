import { createSlice } from "@reduxjs/toolkit";

const allTasksSlice = createSlice({
    name: "allTasks",
    initialState: {
        allTasks : []
    },
    reducers: {
        SetallTask : (state, action) => {
            const isCreated = state.allTasks.find((task)=>(task.title === action.payload.title));
            if(isCreated === undefined) state.allTasks.push(action.payload)
            else alert("same task already exist");
        },
        DeleteTask : (state, action) => {
            if(state.allTasks.length === 1) state.allTasks = [];
            const filterdstate = state.allTasks.filter((task)=>(task.title !== action.payload));
            state.allTasks = filterdstate;
        },
        UpdateStatus : (state, action) => {
            const changedState = state.allTasks.find((task)=>(task.title === action.payload.title));
            if(action.payload.count === 0){
                changedState.status = "TO-DO";
            }else if(action.payload.count === 3){
                changedState.status = 'COMPLETED';
            }else{
                changedState.status = 'IN PROGRESS';
            }
        },
    }
});

export const { SetallTask,DeleteTask,UpdateStatus } = allTasksSlice.actions;

export default allTasksSlice.reducer;