import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
    name: "tasks",
    initialState: {
        task : null,
    },
    reducers: {
        SetTask : (state, action) => {
            state.task = action.payload;
        },
    }
});

export const { SetTask, SetSubtasks } = tasksSlice.actions;

export default tasksSlice.reducer;